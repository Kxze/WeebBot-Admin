import { Router } from "../types";
import * as passport from "passport";
import { Strategy } from "passport-discord";
import fetch from "node-fetch";
import { isNumber } from "util";

interface Guild {
    id: String;
    name: String;
    icon: String;
    owner: Boolean;
    permissions: Number;
}

interface User {
    username: String;
    discriminator: String;
    mfa_enabled: Boolean;
    id: String;
    avatar: String;
    guilds: Guild[];
}

interface DbUser {
    id: Number;
    token: String;
    discordId: String;
}

const getUserData = async (user: any, res: any): Promise<User> => {
    let response;
    // Get user data
    response = await fetch("https://discordapp.com/api/users/@me", {
        headers: { Authorization: "Bearer " + user.token }
    });
    if (response.status !== 200) {
        return res.status(500).json({ error: await response.json() });
    }

    const userData = await response.json();

    // Get user guilds
    response = await fetch("https://discordapp.com/api/users/@me/guilds", {
        headers: { Authorization: "Bearer " + user.token }
    });
    if (response.status !== 200) {
        return res.status(500).json({ error: await response.json() });
    }

    const userGuilds: Guild[] = (await response.json()).filter((guild: Guild) => guild.owner === true);

    return {
        ...userData,
        guilds: userGuilds,
    };
};

export default ({ server, db, config }: Router) => {

    passport.use(new Strategy(config.discord, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
        const dbUser = await db("users").where({ discordId: profile.id });
        if (dbUser.length > 0) {
            // Update token
            await db("users").update({ token: accessToken }).where({ discordId: profile.id });

            const newDbUser = (await db("users").where({ discordId: profile.id }))[0];
            done(null, newDbUser);
        } else {
            await db("users").insert({ discordId: profile.id, token: accessToken });

            const user = (await db("users").where({ discordId: profile.id }))[0];
            done(null, user);
        }
    }));

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = (await db("users").where({ id }))[0];
        done(null, user);
    });

    server.get("/api/auth/discord", passport.authenticate('discord', { scope: config.discord.scopes }));
    server.get('/api/auth/discord/callback', passport.authenticate('discord'), (req, res) => {
        res.redirect("/api/me");
    });

    server.get("/api/me", async (req, res) => {
        if (!req.user) { return res.status(401).json({ error: "Log in" }); }

        const userData = await getUserData(req.user, res);

        return res.json();
    });

    server.put("/api/guild/", async (req, res) => {
        if (!req.user) { return res.status(401).json({ error: "Log in" }); }
        if (!req.body || !req.body.guild || !req.body.ships) { return res.status(400).send(); }

        const user = await getUserData(req.user, res);
        if (!user.guilds.some(guild => guild.id === req.body.guild)) {
            return res.status(403).json({ error: "Not the owner" });
        }

        const ships = req.body.ships.filter((ship: any) => isNumber(ship) && 1 < ship && ship < 10).join(",");

        const alerts = await db("alerts").where({ guildId: req.body.guild });
        if (!alerts) {
            await db("alerts").insert({ guildId: req.body.guild, ships });
        } else {
            await db("alerts").update({ guildId: req.body.guild, ships });
        }

        return res.status(200).send();
    });
};
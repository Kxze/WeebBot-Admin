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
}

interface Profile extends User {
    guilds: Guild[];
    avatarUrl?: String;
}

interface DbUser {
    id: Number;
    token: String;
    discordId: String;
}

export default ({ server, db, config }: Router) => {

    passport.use(new Strategy(config.discord, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
        done(null, {
            ...profile,
            accessToken: undefined,
            avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`,
            guilds: profile.guilds.filter((guild: Guild) => guild.owner === true),
        });
    }));

    passport.serializeUser((user: any, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    server.get("/api/auth/discord", passport.authenticate('discord', { scope: config.discord.scopes }));
    server.get('/api/auth/discord/callback', passport.authenticate('discord'), (req, res) => {
        res.redirect("http://localhost:8080/");
    });

    server.get("/api/me", async (req, res) => {
        if (!req.user) { return res.status(401).json({ error: "Log in" }); }

        return res.json(req.user);
    });

    server.get("/api/guild/:id", async (req, res) => {
        if (!req.user) { return res.sendStatus(401); }

        const data = await fetch(`https://discordapp.com/api/guilds/${req.params.id}/channels`, {
            headers: {
                "Authorization": "Bot " + config.bot.token,
            }
        });

        if (data.status === 403) {
            return res.status(403).json({ error: "Bot is not in the server" });
        }

        const jsonData = await data.json();
        const responseData = jsonData
            .filter((channel: any) => channel.type === 0)
            .map((channel: any) => ({
                key: channel.id,
                value: channel.id,
                text: "#" + channel.name,
            }));

        return res.send(responseData);
    });

    server.put("/api/guild/", async (req, res) => {
        if (!req.user) { return res.status(401).json({ error: "Log in" }); }
        if (!req.body || !req.body.guild || !req.body.channels || !req.body.ships) { return res.status(400).send(); }

        if (!req.user.guilds.some((guild: Guild) => guild.id === req.body.guild)) {
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
import { Router, IChannel } from "../types";
import * as passport from "passport";
import { Strategy } from "passport-discord";
import fetch from "node-fetch";
import { isNumber } from "util";

interface Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
}

interface User {
    username: string;
    discriminator: string;
    mfa_enabled: boolean;
    id: string;
    avatar: string;
}

interface Profile extends User {
    guilds: Guild[];
    avatarUrl?: string;
}

interface DbUser {
    id: number;
    token: string;
    discordId: string;
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
        // console.log(req);
        res.redirect("http://localhost:8080/");
    });

    server.get("/api/me", async (req, res) => {
        if (!req.user) { return res.status(401).json({ error: "Log in" }); }

        return res.json(req.user);
    });

    server.get("/api/guild/:id", async (req, res) => {
        if (!req.user) { return res.sendStatus(401); }
        console.log(req.params.id);

        const data = await fetch(`https://discordapp.com/api/guilds/${req.params.id}/channels`, {
            headers: {
                "Authorization": "Bot " + config.discord.token,
            }
        });

        if (data.status === 403) {
            return res.status(403).json({ error: "Bot is not in the server" });
        }

        const dbChannels = await db("alerts")
            .select("*")
            .where({
                guildId: req.params.id
            });

        const jsonData = await data.json();
        const responseData = jsonData
            .filter((channel: any) => channel.type === 0)
            .map((channel: any) => {
                const alert = dbChannels.find((alert: IChannel) => alert.channelId == channel.id);

                return {
                    key: channel.id,
                    value: channel.id,
                    text: "#" + channel.name,
                    ships: alert ? alert.ships.split(",").map(Number) : undefined,
                };
            });

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
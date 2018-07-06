import { Router, IChannel, Guild } from "../types";
import * as passport from "passport";
import { Strategy } from "passport-discord";

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
        res.redirect(config.frontUrl);
    });

    server.get("/api/me", async (req, res) => {
        if (!req.user) { return res.status(401).json({ error: "Log in" }); }

        return res.json(req.user);
    });
};
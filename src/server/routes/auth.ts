import { Router } from "../types";
import * as passport from "passport";
import { Strategy } from "passport-discord";

export default ({ server, db, config }: Router) => {

    passport.use(new Strategy(config.discord, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
        const dbUser = await db("users").where({ discordId: profile.id });
        if (dbUser.length > 0) {
            done(null, dbUser[0]);
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
        const user = await db("users").where({ id });
        done(null, user);
    });

    server.get("/", (req, res) => {
        console.log("hello!");
    });
    server.get("/api/auth/discord", passport.authenticate('discord', { scope: config.discord.scopes }));
    server.get('/api/auth/discord/callback', passport.authenticate('discord'), (req, res) => {
        res.json(req.user);
    });
};
import * as express from 'express';
import * as knex from 'knex';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from "./utils";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";

const server = express();
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const db = knex({
    client: "mysql",
    connection: config.db
});

// Middlewares
server.use(cookieParser());
server.use(session({
    secret: 'weebbot',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
server.use(passport.initialize() as any);
server.use(passport.session());

// Routes
function loadRoute(file: string): any {
    console.log("Loaded route", file);
    return require("./routes/" + file).default({ server, config, db });
}

fs.readdirSync("./bin-server/server/routes")
    .filter(file => file.endsWith(".js"))
    .map(file => loadRoute(file));

// Start server
utils.syncDatabase(db)
    .then(() => {
        server.listen(config.server.port, () => {
            console.log(`${server.name} listening`);
        });
    });

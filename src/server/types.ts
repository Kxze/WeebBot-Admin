import * as Express from "express";
import * as Knex from "knex";

interface DiscordConfigObject {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scopes: Array<string>;
}

interface DatabaseConfigObject {
    host: string;
    user: string;
    password: string;
    database: string;
}

interface ServerConfigObject {
    port: Number;
}

interface ConfigObject {
    discord: DiscordConfigObject;
    server: ServerConfigObject;
    db: DatabaseConfigObject;
}

export interface Router {
    server: Express.Router;
    db: Knex;
    config: ConfigObject;
}
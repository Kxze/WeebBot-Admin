import * as Express from "express";
import * as Knex from "knex";

interface DiscordConfigObject {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    token: string;
    scopes: Array<string>;
}

interface DatabaseConfigObject {
    host: string;
    user: string;
    password: string;
    database: string;
}

interface ServerConfigObject {
    port: number;
}

interface BotConfigObject {
    token: string;
}

interface ConfigObject {
    discord: DiscordConfigObject;
    server: ServerConfigObject;
    db: DatabaseConfigObject;
    bot: BotConfigObject;
}

export interface Router {
    server: Express.Router;
    db: Knex;
    config: ConfigObject;
}

export interface IChannel {
    id: number;
    guildId: number;
    channelId: number;
    ships: string;
}

export interface Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
}

export interface User {
    username: string;
    discriminator: string;
    mfa_enabled: boolean;
    id: string;
    avatar: string;
}

export interface Profile extends User {
    guilds: Guild[];
    avatarUrl?: string;
}

export interface DbUser {
    id: number;
    token: string;
    discordId: string;
}

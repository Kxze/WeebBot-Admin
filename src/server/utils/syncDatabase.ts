import * as Knex from 'knex';

export const syncDatabase = async (db: Knex) => {
    // Create tables
    if (!await db.schema.hasTable("alerts")) {
        await db.schema.createTable("alerts", (table) => {
            table.increments("id");
            table.string("guildId");
            table.string("channelId");
            table.string("ships");
        });
    }

    if (!await db.schema.hasTable("users")) {
        await db.schema.createTable("users", (table) => {
            table.increments("id");
            table.bigInteger("discordId");
            table.string("token");
        });
    }
};
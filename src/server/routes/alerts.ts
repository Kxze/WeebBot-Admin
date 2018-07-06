import { Router, IChannel, Guild } from "../types";
import fetch from "node-fetch";
import { isNumber } from "util";

export default ({ server, db, config }: Router) => {
  server.get("/api/guild/:id", async (req, res) => {
    if (!req.user) { return res.sendStatus(401); }

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
          ships: alert ? alert.ships.split(",").map(Number) : [],
        };
      });

    return res.send(responseData);
  });

  server.put("/api/guild/", async (req, res) => {
    if (!req.user) { return res.status(401).json({ error: "Log in" }); }
    if (!req.body || !req.body.guild || !req.body.channel || !req.body.ships) { return res.status(400).send(); }

    if (!req.user.guilds.some((guild: Guild) => guild.id === req.body.guild)) {
      return res.status(403).json({ error: "Not the owner" });
    }

    const ships = req.body.ships.filter((ship: any) => isNumber(ship) && 1 <= ship && ship <= 10).join(",");

    const alerts = await db("alerts").where({ guildId: req.body.guild });
    if (!alerts) {
      await db("alerts").insert({ guildId: req.body.guild, channelId: req.body.channel, ships });
    } else {
      await db("alerts").update({ guildId: req.body.guild, channelId: req.body.channel, ships });
    }

    return res.status(200).send();
  });

};

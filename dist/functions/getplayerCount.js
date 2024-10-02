"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const mcs = require('node-mcstatus');
exports.default = new forgescript_1.NativeFunction({
    name: '$getPlayCount',
    description: 'Get the number of online players on a Minecraft server',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'host',
            description: 'Host Domain',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'port',
            description: 'The Host Port',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'display Java Options',
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [host, port, options]) {
        try {
            const result = await mcs.statusJava(host, port, options);
            // Extract and log the player count
            const playerCount = result.players.online;
            // Validate and print the number of players online
            if (typeof playerCount === 'number' && playerCount >= 0 && Number.isInteger(playerCount)) {
                console.log(`There are currently ${playerCount} players online.`);
            }
            else {
                console.log("Player count is incorrect or invalid.");
            }
            // Return the player count in the success response
            return this.successJSON({ onlinePlayers: playerCount });
        }
        catch (error) {
            console.error("Error fetching player count:", error);
            return this.customError("Failed to fetch player count");
        }
    }
});
//# sourceMappingURL=getplayerCount.js.map
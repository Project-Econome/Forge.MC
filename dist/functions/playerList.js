"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const mcs = require('node-mcstatus');
exports.default = new forgescript_1.NativeFunction({
    name: '$listPlayersOnline',
    description: 'List all online players on a Minecraft server (clean format)',
    version: '1.1.0',
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
            description: 'Display Java Options',
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [host, port, options]) {
        try {
            const result = await mcs.statusJava(host, port, options);
            // Ensure players list is an array
            const playerList = result.players.list;
            if (Array.isArray(playerList)) {
                // Map the clean player list (only uuid and name_clean)
                const cleanPlayerList = playerList.map(player => ({
                    uuid: player.uuid,
                    name_clean: player.name_clean
                }));
                // Return the clean player list in JSON format
                return this.success(JSON.stringify(cleanPlayerList, null, 2));
            }
            else {
                console.log("Player list is not an array.");
                return this.customError("Invalid player list format");
            }
        }
        catch (error) {
            console.error("Error fetching player list:", error);
            return this.customError("Failed to fetch player list");
        }
    }
});
//# sourceMappingURL=playerList.js.map
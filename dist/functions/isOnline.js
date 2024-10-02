"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const mcs = require('node-mcstatus');
exports.default = new forgescript_1.NativeFunction({
    name: '$isOnline',
    description: 'Check if the Minecraft server is online',
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
            // Check if the server is online
            const isOnline = result.online;
            // Validate and log the online status
            if (typeof isOnline === 'boolean') {
                console.log(`The server is ${isOnline ? 'online' : 'offline'}.`);
            }
            else {
                console.log("Online status is invalid.");
            }
            // Return the online status in the success response
            return this.success(isOnline);
        }
        catch (error) {
            console.error("Error checking server online status:", error);
            return this.customError("Failed to check server online status");
        }
    }
});
//# sourceMappingURL=isOnline.js.map
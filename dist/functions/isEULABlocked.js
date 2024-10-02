"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const mcs = require('node-mcstatus');
exports.default = new forgescript_1.NativeFunction({
    name: '$isEulaBlocked',
    description: 'Check if the Minecraft server is EULA blocked',
    version: '1.0.1',
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
            // Check if the server is EULA blocked
            const isEulaBlocked = result.eula_blocked;
            // Validate and log the EULA blocked status
            if (typeof isEulaBlocked === 'boolean') {
                console.log(`The server is ${isEulaBlocked ? 'Blocked' : 'Not Blocked'}.`);
            }
            else {
                console.log("EULA blocked status is invalid.");
            }
            // Return the EULA blocked status in the success response
            return this.success(isEulaBlocked);
        }
        catch (error) {
            console.error("Error checking EULA blocked status:", error);
            return this.customError("Failed to check EULA blocked status");
        }
    }
});
//# sourceMappingURL=isEULABlocked.js.map
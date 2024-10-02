import { ArgType, NativeFunction } from "@tryforge/forgescript";
const mcs = require('node-mcstatus');

interface BlockedResult {
    eula_blocked: boolean;
}

export default new NativeFunction({
    name: '$isEulaBlocked',
    description: 'Check if the Minecraft server is blocked by mojang',
    version: '1.0.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'host',
            description: 'Host Domain',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'port',
            description: 'The Host Port',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'display Java Options',
            type: ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [host, port, options]) {
        try {
            const result: BlockedResult = await mcs.statusJava(host, port, options);

            // Check if the server is online
            const isBlocked = result.eula_blocked;

            // Validate and log the online status
            if (typeof isBlocked === 'boolean') {
                console.log(`The server is ${isBlocked ? 'Blocked' : 'Not Blocked'}.`);
            } else {
                console.log("Eula status is invalid.");
            }

            // Return the online status in the success response
            return this.success(isBlocked);
        } catch (error) {
            console.error("Error checking server Eula status:", error);
            return this.customError("Failed to check server Eula status");
        }
    }
});

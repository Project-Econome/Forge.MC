"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const mcs = require('node-mcstatus');
exports.default = new forgescript_1.NativeFunction({
    name: '$getVersion',
    description: 'Get the Minecraft server version in clean or raw format, along with protocol number',
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
            description: 'Display Java Options',
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false
        },
        {
            name: 'format',
            description: 'Choose between "clean" or "raw" version format',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [host, port, options, format]) {
        try {
            const result = await mcs.statusJava(host, port, options);
            if (result.version !== null) {
                let versionOutput;
                // Validate and output the version based on the format argument
                if (format === 'clean' && typeof result.version.name_clean === 'string' && result.version.name_clean.length > 0) {
                    versionOutput = result.version.name_clean;
                    console.log(`Version (clean): ${versionOutput}`);
                }
                else if (format === 'raw' && typeof result.version.name_raw === 'string' && result.version.name_raw.length > 0) {
                    versionOutput = result.version.name_raw;
                    console.log(`Version (raw): ${versionOutput}`);
                }
                else {
                    console.log("Invalid version format or not available.");
                    return this.customError("Invalid or unavailable version format");
                }
                // Validate the protocol
                const protocol = result.version.protocol;
                if (typeof protocol === 'number' && Number.isInteger(protocol)) {
                    console.log(`Protocol: ${protocol}`);
                }
                else {
                    console.log("Protocol is invalid or missing.");
                    return this.customError("Invalid protocol");
                }
                // Return the version and protocol as JSON
                return this.success(JSON.stringify({ version: versionOutput, protocol: protocol }, null, 2));
            }
            else {
                console.log("Version object is null.");
                return this.customError("Version not found");
            }
        }
        catch (error) {
            console.error("Error fetching version:", error);
            return this.customError("Failed to fetch version");
        }
    }
});
//# sourceMappingURL=getEdition.js.map
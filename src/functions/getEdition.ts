import { ArgType, NativeFunction } from "@tryforge/forgescript";
const mcs = require('node-mcstatus');

interface VersionResult {
    version: {
        clean: string;
        raw: string;
    };
}

export default new NativeFunction({
    name: '$getEdition',
    description: 'Get the Edition from a Minecraft server in clean or raw format',
    version: '1.1.5',
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
            description: 'Display Java Options',
            type: ArgType.Boolean,
            required: true,
            rest: false
        },
        {
            name: 'format',
            description: 'Choose between "clean" or "raw" format',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [host, port, options, format]) {
        try {
            const result: VersionResult = await mcs.statusJava(host, port, options);

            // Validate and extract the MOTD based on the format argument
            if (typeof result.version === 'object') {
                let versionOutput: string;

                if (format === 'clean' && typeof result.version.clean === 'string' && result.version.clean.length > 0) {
                    versionOutput = result.version.clean;
                    console.log(`Version (clean): ${versionOutput}`);
                } else if (format === 'raw' && typeof result.version.raw === 'string' && result.version.raw.length > 0) {
                    versionOutput = result.version.raw;
                    console.log(`Version (raw): ${versionOutput}`);
                } else {
                    console.log("Invalid MOTD format or not available.");
                    return this.customError("Invalid or unavailable Version format");
                }

                // Return the MOTD in the requested format as JSON
                return this.success(JSON.stringify({ version: versionOutput }, null, 2));
            } else {
                console.log("Version object is invalid or missing.");
                return this.customError("Version not found");
            }
        } catch (error) {
            console.error("Error fetching Version:", error);
            return this.customError("Failed to fetch Version");
        }
    }
});

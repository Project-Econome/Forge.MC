import { ArgType, NativeFunction } from "@tryforge/forgescript";
const mcs = require('node-mcstatus');

interface Result {
    icon: string | null;
}

export default new NativeFunction({
    name: '$getIcon',
    description: 'Get Java Icon URL',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'host',
            description: 'Host Domain',
            type: ArgType.String,
            required: false,
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
    async execute (ctx, [host, port, options]) {
        try {
            const result: Result = await mcs.statusJava(host, port, options);
            
            // Test the result object
            expect(typeof result.icon === 'string' || result.icon === null).toBe(true);
            
            if (typeof result.icon === 'string') {
                expect(result.icon.length).toBeGreaterThan(0);
                expect(result.icon.startsWith('data:image/png;base64,')).toBe(true);
            }
            
            return this.success();
        } catch (error) {
            console.error("Error fetching status:", error);
            return this.customError("Failed to fetch status");
        }
    }
});

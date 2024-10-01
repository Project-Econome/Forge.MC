"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const globals_1 = require("@jest/globals");
const mcs = require('node-mcstatus');
exports.default = new forgescript_1.NativeFunction({
    name: '$getIcon',
    description: 'Get Java Icon URL',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'host',
            description: 'Host Domain',
            type: forgescript_1.ArgType.String,
            required: false,
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
            // Test the result object
            (0, globals_1.expect)(typeof result.icon === 'string' || result.icon === null).toBe(true);
            if (typeof result.icon === 'string') {
                (0, globals_1.expect)(result.icon.length).toBeGreaterThan(0);
                (0, globals_1.expect)(result.icon.startsWith('data:image/png;base64,')).toBe(true);
            }
            return this.success();
        }
        catch (error) {
            console.error("Error fetching status:", error);
            return this.customError("Failed to fetch status");
        }
    }
});
//# sourceMappingURL=getIcon.js.map
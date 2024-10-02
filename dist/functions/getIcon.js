"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
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
            // Perform manual checks instead of using expect
            if (typeof result.icon === 'string' || result.icon === null) {
                if (typeof result.icon === 'string') {
                    if (result.icon.length > 0 && result.icon.startsWith('data:image/png;base64,')) {
                        ctx.container.files.push(new discord_js_1.AttachmentBuilder(Buffer.from(result.icon.slice('data:image/png;base64,'.length), 'base64'), {
                            name: 'icon.png'
                        }));
                    }
                    else {
                        console.log("Icon format is incorrect");
                    }
                }
                else {
                    console.log("No icon available (null)");
                }
            }
            else {
                console.log("Invalid icon type");
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeMC = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class ForgeMC extends forgescript_1.ForgeExtension {
    name = 'Forge.MC';
    description = 'A forgescript extension that allows you to create and edit images with ease.';
    version = '1.0.0';
    init() {
        this.load(__dirname + '/functions');
    }
    ;
}
exports.ForgeMC = ForgeMC;
;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const templates_1 = __importDefault(require("./templates/templates"));
/**
 * CRUD-BUILDER
 * @param model {any}
 * @param methods {IMethods}
 * @return {IEndpoints}
 */
function default_1(model, methods) {
    const endpoints = {};
    for (const [methodName, gettingOptionsInstruction] of Object.entries(methods)) {
        const methodOptions = (0, utils_1.getMethodOptions)(gettingOptionsInstruction);
        const Model = (0, utils_1.getModel)(methodOptions.model || model);
        const templateName = methodOptions.template || methodName;
        const template = templates_1.default[templateName];
        if (template) {
            endpoints[methodName] = template(Model, gettingOptionsInstruction);
        }
        else {
            throw Error(`Template "${templateName}" not found`);
        }
    }
    return endpoints;
}
exports.default = default_1;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const utils_1 = require("../utils");
/**
 * FIND-ONE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodFindOneOptions>)}
 * @return {express.Handler}
 */
function default_1(Model, gettingOptionsInstruction) {
    return async (req, res) => {
        try {
            const options = (0, utils_1.getMethodOptions)(gettingOptionsInstruction);
            const ctx = {
                req,
                res
            };
            const queryOptions = await (0, utils_1.getQueryOptions)().single(req, options.key, options.queryBuilder, ctx);
            ctx.instance = await Model.findOne(queryOptions);
            if (!ctx.instance) {
                const status = 404;
                return res.status(status).json({
                    status,
                    message: 'Not found'
                });
            }
            const status = 200;
            if (options.response) {
                const response = await options.response(ctx);
                return res.status(response.status || status).json(response);
            }
            return res.status(status).json({
                status,
                message: http_status_codes_1.default.getStatusText(status),
                result: ctx.instance
            });
        }
        catch (err) {
            return (0, utils_1.errorResponse)(err, res);
        }
    };
}
exports.default = default_1;

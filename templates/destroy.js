"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const utils_1 = require("../utils");
/**
 * DESTROY
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodDestroyOptions>)}
 * @return {express.Handler}
 */
function default_1(Model, gettingOptionsInstruction) {
    return async (req, res) => {
        try {
            const options = (0, utils_1.getMethodOptions)(gettingOptionsInstruction);
            const ctx = {
                req,
                res,
                state: {}
            };
            if (options.state) {
                ctx.state = await (0, utils_1.getContextState)(req, options, ctx);
            }
            const queryOptions = await (0, utils_1.getQueryOptions)().single(req, options.key, options.queryBuilder, ctx);
            ctx.instance = await Model.findOne(queryOptions);
            if (!ctx.instance) {
                const status = 404;
                return res.status(status).json({
                    status,
                    message: 'Not found'
                });
            }
            const destroyOptions = {};
            if (options.force) {
                if (typeof options.force === 'function') {
                    destroyOptions.force = await options.force(ctx);
                }
                else {
                    destroyOptions.force = true;
                }
            }
            if (options.beforeDestroy) {
                await options.beforeDestroy(ctx);
            }
            await ctx.instance.destroy(destroyOptions);
            if (options.afterDestroy) {
                await options.afterDestroy(ctx);
            }
            const status = 200;
            if (options.sendStatus) {
                return res.sendStatus(status);
            }
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

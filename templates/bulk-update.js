"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const utils_1 = require("../utils");
/**
 * BULK-UPDATE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkUpdateOptions>)}
 * @return {express.Handler}
 */
function default_1(Model, gettingOptionsInstruction) {
    return async (req, res) => {
        try {
            const options = (0, utils_1.getMethodOptions)(gettingOptionsInstruction);
            const ctx = {
                req,
                res,
                state: {},
                fields: null
            };
            if (options.state) {
                ctx.state = await (0, utils_1.getContextState)(req, options, ctx);
            }
            if (options.validator !== false && options.rules) {
                const errors = await (0, utils_1.getValidationErrors)(req, options.rules, ctx);
                if (errors) {
                    const status = 400;
                    return res.status(status).json({
                        status,
                        message: 'Validation errors',
                        errors
                    });
                }
            }
            ctx.fields = await (0, utils_1.getContextFields)(req, options.only, ctx);
            if (options.formatter) {
                await options.formatter(ctx);
            }
            if (options.beforeUpdate) {
                await options.beforeUpdate(ctx);
            }
            if (ctx.fields) {
                const queryOptions = await (0, utils_1.getQueryOptions)().multiple(options.queryBuilder, ctx);
                await Model.update(ctx.fields, queryOptions);
            }
            if (options.afterUpdate) {
                await options.afterUpdate(ctx);
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
                message: http_status_codes_1.default.getStatusText(status)
            });
        }
        catch (err) {
            return (0, utils_1.errorResponse)(err, res);
        }
    };
}
exports.default = default_1;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const utils_1 = require("../utils");
/**
 * BULK-RESTORE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkRestoreOptions>)}
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
            const queryOptions = await (0, utils_1.getQueryOptions)().multiple(options.queryBuilder, ctx);
            if (options.beforeRestore) {
                await options.beforeRestore(ctx);
            }
            await Model.restore(queryOptions);
            if (options.afterRestore) {
                await options.afterRestore(ctx);
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

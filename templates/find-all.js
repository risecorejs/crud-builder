"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const utils_1 = require("../utils");
/**
 * FIND-ALL
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodFindAllOptions>)}
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
            options.method ||= 'findAndCountAll';
            const queryOptions = {
                order: [['id', 'DESC']]
            };
            if (options.method === 'findAndCountAll') {
                queryOptions.distinct = true;
            }
            if (options.pagination !== false) {
                Object.assign(queryOptions, req.pagination());
            }
            const _queryOptions = await (0, utils_1.getQueryOptions)().multiple(options.queryBuilder, ctx);
            Object.assign(queryOptions, _queryOptions);
            ctx.instances = await Model[options.method](queryOptions);
            const status = 200;
            if (options.response) {
                const response = await options.response(ctx);
                return res.status(response.status || status).json(response);
            }
            return res.json({
                status,
                message: http_status_codes_1.default.getStatusText(status),
                result: ctx.instances
            });
        }
        catch (err) {
            return (0, utils_1.errorResponse)(err, res);
        }
    };
}
exports.default = default_1;

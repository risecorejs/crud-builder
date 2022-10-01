"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.getQueryOptions = exports.getContextFields = exports.getValidationErrors = exports.getContextState = exports.getModel = exports.getMethodOptions = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const models_1 = __importDefault(require("@risecorejs/core/models"));
/**
 * GET-METHOD-OPTIONS
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<any>}
 * @return {any}
 */
function getMethodOptions(gettingOptionsInstruction) {
    if (gettingOptionsInstruction === true) {
        return {};
    }
    else {
        return gettingOptionsInstruction();
    }
}
exports.getMethodOptions = getMethodOptions;
/**
 * GET-MODEL
 * @param model {any}
 * @return {typeof M}
 */
function getModel(model) {
    if (typeof model === 'string') {
        const Model = models_1.default[model];
        if (Model) {
            return Model;
        }
        else {
            throw Error(`Model "${model}" not found`);
        }
    }
    else {
        return model;
    }
}
exports.getModel = getModel;
/**
 * GET-CONTEXT-STATE
 * @param req {express.Request}
 * @param state {undefined | TMethodState}
 * @param ctx {any}
 * @return {object | Promise<object>}
 */
function getContextState(req, state, ctx) {
    if (typeof state === 'function') {
        return state(ctx);
    }
    else {
        return state;
    }
}
exports.getContextState = getContextState;
/**
 * GET-VALIDATION-ERRORS
 * @param req {express.Request}
 * @param rules {TMethodRules}
 * @param ctx {any}
 * @return {Promise<null | object>}
 */
async function getValidationErrors(req, rules, ctx) {
    if (typeof rules === 'function') {
        rules = await rules(ctx);
    }
    return req.validator(rules);
}
exports.getValidationErrors = getValidationErrors;
/**
 * GET-CONTEXT-FIELDS
 * @param req {express.Request}
 * @param only {undefined | TMethodOnly}
 * @param ctx {any}
 * @return {Promise<null | object>}
 */
async function getContextFields(req, only, ctx) {
    if (only) {
        if (typeof only === 'function') {
            only = await only(ctx);
        }
        return req.only(only);
    }
    else {
        return req.body;
    }
}
exports.getContextFields = getContextFields;
/**
 * GET-QUERY-OPTIONS
 */
function getQueryOptions() {
    return {
        /**
         * MULTIPLE
         * @param queryBuilder {undefined | FindOptions | IMethodQueryBuilderHandlerWithContext}
         * @param ctx {any}
         * @return {FindOptions | Promise<FindOptions>}
         */
        multiple(queryBuilder, ctx) {
            if (queryBuilder) {
                if (typeof queryBuilder === 'function') {
                    return queryBuilder(ctx);
                }
                else {
                    return queryBuilder;
                }
            }
            else {
                return {};
            }
        },
        /**
         * SINGLE
         * @param req {express.Request}
         * @param key {undefined | TMethodKey}
         * @param queryBuilder {undefined | FindOptions | IMethodQueryBuilderHandlerWithContext}
         * @param ctx {any}
         * @return {Promise<FindOptions>}
         */
        async single(req, key, queryBuilder, ctx) {
            const queryOptions = {
                where: {}
            };
            if (key !== false) {
                key ||= 'id';
                queryOptions.where[key] = req.params[key];
            }
            if (queryBuilder) {
                if (typeof queryBuilder === 'function') {
                    const _queryOptions = await queryBuilder(ctx);
                    if (_queryOptions.where) {
                        Object.assign(queryOptions.where, _queryOptions.where);
                        delete _queryOptions.where;
                    }
                    Object.assign(queryOptions, _queryOptions);
                }
                else {
                    if (queryBuilder.where) {
                        Object.assign(queryOptions.where, queryBuilder.where);
                        delete queryBuilder.where;
                    }
                    Object.assign(queryOptions, queryBuilder);
                }
            }
            return queryOptions;
        }
    };
}
exports.getQueryOptions = getQueryOptions;
/**
 * ERROR-RESPONSE
 * @param err {any}
 * @param res {express.Response}
 * @return {any}
 */
function errorResponse(err, res) {
    if (err.consoleError !== false) {
        console.error(err);
    }
    const status = err.status || err.response?.status || 500;
    const response = {
        status,
        message: err.message || http_status_codes_1.default.getStatusText(status)
    };
    if (err.errors) {
        response.errors = err.errors;
    }
    return res.status(status).json(response);
}
exports.errorResponse = errorResponse;

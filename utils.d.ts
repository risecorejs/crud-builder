import express from 'express';
import { FindOptions } from 'sequelize/types/model';
import { TGettingOptionsInstruction, CModel, IMethodQueryBuilderHandlerWithContext, TMethodKey, TMethodRules, TMethodOnly, TMethodState } from './types';
/**
 * GET-METHOD-OPTIONS
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<any>}
 * @return {any}
 */
export declare function getMethodOptions<T = any>(gettingOptionsInstruction: TGettingOptionsInstruction<T>): T;
/**
 * GET-MODEL
 * @param model {any}
 * @return {typeof CModel}
 */
export declare function getModel(model: any): typeof CModel;
/**
 * GET-CONTEXT-STATE
 * @param req {express.Request}
 * @param state {undefined | TMethodState}
 * @param ctx {any}
 * @return {object | Promise<object>}
 */
export declare function getContextState(req: express.Request, state: TMethodState, ctx: any): object | Promise<object>;
/**
 * GET-VALIDATION-ERRORS
 * @param req {express.Request}
 * @param rules {TMethodRules}
 * @param ctx {any}
 * @return {Promise<null | object>}
 */
export declare function getValidationErrors(req: express.Request, rules: TMethodRules, ctx: any): Promise<null | object>;
/**
 * GET-CONTEXT-FIELDS
 * @param req {express.Request}
 * @param only {undefined | TMethodOnly}
 * @param ctx {any}
 * @return {Promise<null | object>}
 */
export declare function getContextFields(req: express.Request, only: undefined | TMethodOnly, ctx: any): Promise<null | object>;
/**
 * GET-QUERY-OPTIONS
 */
export declare function getQueryOptions(): {
    /**
     * MULTIPLE
     * @param queryBuilder {undefined | FindOptions | IMethodQueryBuilderHandlerWithContext}
     * @param ctx {any}
     * @return {FindOptions | Promise<FindOptions>}
     */
    multiple(queryBuilder: undefined | FindOptions | IMethodQueryBuilderHandlerWithContext, ctx: any): FindOptions | Promise<FindOptions>;
    /**
     * SINGLE
     * @param req {express.Request}
     * @param key {undefined | TMethodKey}
     * @param queryBuilder {undefined | FindOptions | IMethodQueryBuilderHandlerWithContext}
     * @param ctx {any}
     * @return {Promise<FindOptions>}
     */
    single(req: express.Request, key: undefined | TMethodKey, queryBuilder: undefined | FindOptions | IMethodQueryBuilderHandlerWithContext, ctx: any): Promise<FindOptions>;
};
/**
 * ERROR-RESPONSE
 * @param err {any}
 * @param res {express.Response}
 * @return {any}
 */
export declare function errorResponse(err: any, res: express.Response): express.Response<any, Record<string, any>>;

import httpStatusCodes from 'http-status-codes'
import models from '@risecorejs/core/models'
import express from 'express'

import {
  IErrorResponse,
  IFields,
  IMethodContext,
  IMethodOnlyOptions,
  IMethodQueryBuilderOptions,
  IMethodValidatorOptions
} from './interfaces'
import { TGettingOptionsInstruction, TMethodOnly, TMethodState } from './types'

/**
 * GET-METHOD-OPTIONS
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<any>}
 * @return {any}
 */
export function getMethodOptions(gettingOptionsInstruction: TGettingOptionsInstruction<any>): any {
  if (gettingOptionsInstruction === true) {
    return {}
  } else {
    return gettingOptionsInstruction()
  }
}

/**
 * GET-CONTEXT-STATE
 * @param req {express.Request}
 * @param state {TMethodState}
 * @return {object}
 */
export function getContextState(req: express.Request, state: TMethodState | undefined): object | Promise<object> {
  if (state) {
    if (typeof state === 'function') {
      return state(req)
    } else {
      return state
    }
  } else {
    return {}
  }
}

/**
 * GET-MODEL
 * @param model {string | object}
 * @return {object}
 */
export function getModel(model: string | object): object {
  return typeof model === 'string' ? models[model] : model
}

export function getQueryOptions() {
  return {
    /**
     * MULTIPLE
     * @param req {express.Request}
     * @param options {IMethodQueryBuilderOptions}
     * @param ctx {IMethodContext?}
     * @returns {Promise<object>}
     */
    multiple(req: express.Request, options: IMethodQueryBuilderOptions, ctx?: IMethodContext) {
      if (options.queryBuilder) {
        if (typeof options.queryBuilder === 'function') {
          return options.queryBuilder(ctx || req)
        } else {
          return options.queryBuilder
        }
      } else {
        return {}
      }
    },

    /**
     * SINGLE
     * @param req {express.Request}
     * @param options {Object}
     * @param ctx {IMethodContext?}
     * @returns {Promise<object>}
     */
    async single(req: express.Request, options, ctx?: IMethodContext) {
      const queryOptions: IFields = {
        where: {}
      }

      if (options.key !== false) {
        options.key ||= 'id'

        queryOptions.where[options.key] = req.params[options.key]
      }

      if (options.queryBuilder) {
        if (typeof options.queryBuilder === 'function') {
          const _queryOptions = await options.queryBuilder(ctx || req)

          if (_queryOptions.where) {
            Object.assign(queryOptions.where, _queryOptions.where)

            delete _queryOptions.where
          }

          Object.assign(queryOptions, _queryOptions)
        } else {
          if (options.queryBuilder.where) {
            Object.assign(queryOptions.where, options.queryBuilder.where)

            delete options.queryBuilder.where
          }

          Object.assign(queryOptions, options.queryBuilder)
        }
      }

      return queryOptions
    }
  }
}

/**
 * GET-VALIDATION-ERRORS
 * @param req {express.Request}
 * @param options {IMethodValidatorOptions}
 * @param ctx {IMethodContext}
 * @return {Promise<void|object>}
 */
export async function getValidationErrors(
  req: express.Request,
  options: IMethodValidatorOptions,
  ctx: IMethodContext
): Promise<void | object | null> {
  if (options.validator !== false && options.rules) {
    if (typeof options.rules === 'function') {
      options.rules = await options.rules(ctx)
    }

    return req.validator(options.rules)
  }
}

/**
 * GET-CONTEXT-FIELDS
 * @param req {express.Request}
 * @param options {TMethodOnly}
 * @param ctx {IMethodContext}
 * @returns {Promise<object>}
 */
export async function getContextFields(
  req: express.Request,
  options: IMethodOnlyOptions,
  ctx: IMethodContext
): Promise<null | object> {
  if (options.only) {
    if (typeof options.only === 'function') {
      options.only = await options.only(ctx)
    }

    return req.only(options.only)
  } else {
    return req.body
  }
}

/**
 * ERROR-RESPONSE
 * @param err {any}
 * @param res {express.Response}
 * @return {any}
 */
export function errorResponse(err: any, res: express.Response) {
  console.error(err)

  const status = err.status || err.response?.status || 500

  const response: IErrorResponse = {
    status,
    message: err.message || httpStatusCodes.getStatusText(status)
  }

  if (err.errors) {
    response.errors = err.errors
  }

  return res.status(status).json(response)
}

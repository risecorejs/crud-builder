import httpStatusCodes from 'http-status-codes'
import models from '@risecorejs/core/models'
import express from 'express'

import { Model } from 'sequelize'

import {
  IMethodErrorResponse,
  IFields,
  IMethodContextOptions,
  IMethodOnlyOptions,
  IMethodQueryBuilderOptions,
  IMethodValidatorOptions,
  IMethodContextOptionsWithoutFields
} from './interfaces'

import { TGettingOptionsInstruction, TMethodOnly, TMethodState, TModel } from './types'

/**
 * GET-METHOD-OPTIONS
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<any>}
 * @return {any}
 */
export function getMethodOptions<T = any>(gettingOptionsInstruction: TGettingOptionsInstruction<T>): T {
  if (gettingOptionsInstruction === true) {
    return <T>{}
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
 * @param model {TModel}
 * @return {object}
 */
export function getModel(model: TModel): Model | undefined {
  return typeof model === 'string' ? models[model] : model
}

export function getQueryOptions() {
  return {
    /**
     * MULTIPLE
     * @param req {express.Request}
     * @param options {IMethodQueryBuilderOptions}
     * @param ctx {IMethodContextOptions?}
     * @returns {Promise<IFields>}
     */
    multiple(
      req: express.Request,
      options: IMethodQueryBuilderOptions,
      ctx?: IMethodContextOptions
    ): IFields | Promise<IFields> {
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
     * @param ctx {IMethodContextOptions?}
     * @returns {Promise<object>}
     */
    async single(
      req: express.Request,
      options: IMethodQueryBuilderOptions,
      ctx?: IMethodContextOptions | IMethodContextOptionsWithoutFields
    ): Promise<IFields> {
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
 * @param ctx {IMethodContextOptions}
 * @return {Promise<void|object>}
 */
export async function getValidationErrors(
  req: express.Request,
  options: IMethodValidatorOptions,
  ctx: IMethodContextOptions
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
 * @param ctx {IMethodContextOptions}
 * @returns {Promise<object>}
 */
export async function getContextFields(
  req: express.Request,
  options: IMethodOnlyOptions,
  ctx: IMethodContextOptions
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

  const response: IMethodErrorResponse = {
    status,
    message: err.message || httpStatusCodes.getStatusText(status)
  }

  if (err.errors) {
    response.errors = err.errors
  }

  return res.status(status).json(response)
}

import httpStatusCodes from 'http-status-codes'
import models from '@risecorejs/core/models'
import express from 'express'

import { IMethodBaseOptions, IMethodContext, IMethodOnlyOptions, IMethodValidatorOptions } from './interfaces'
import { TMethodOnly, TMethodState } from './types'

/**
 * GET-METHOD-OPTIONS
 * @param value {true  | (() => any)}
 * @return {any}
 */
export function getMethodOptions(value: true | (() => any)): any {
  if (value === true) {
    return {}
  } else {
    return value()
  }
}

/**
 * DECORATOR-GET-OPTIONS
 * @param getOptions {() => true | object}
 * @returns {object}
 */
export function decoratorGetOptions(getOptions: () => true | object): object {
  const options = getOptions()

  if (options === true) {
    return {}
  } else {
    return options
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
     * TYPE-1
     * @param req {Object}
     * @param options {Object}
     * @param context {Object?}
     * @returns {Promise<Object>}
     */
    async type1(req, options, context) {
      if (options.queryBuilder) {
        if (typeof options.queryBuilder === 'function') {
          return await options.queryBuilder(context || req)
        } else {
          return options.queryBuilder
        }
      } else {
        return {}
      }
    },

    /**
     * TYPE-2
     * @param req {Object}
     * @param options {Object}
     * @param context {Object?}
     * @returns {Promise<Object>}
     */
    async type2(req, options, context) {
      const queryOptions = {
        where: {}
      }

      if (options.key !== false) {
        options.key ||= 'id'

        queryOptions.where[options.key] = req.params[options.key]
      }

      if (options.queryBuilder) {
        if (typeof options.queryBuilder === 'function') {
          const _queryOptions = await options.queryBuilder(context || req)

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
 * @param context {IMethodContext}
 * @return {Promise<void|object>}
 */
export async function getValidationErrors(
  req: express.Request,
  options: IMethodValidatorOptions,
  context: IMethodContext
): Promise<void | object | null> {
  if (options.validator !== false && options.rules) {
    if (typeof options.rules === 'function') {
      options.rules = await options.rules(context)
    }

    return req.validator(options.rules)
  }
}

/**
 * GET-CONTEXT-FIELDS
 * @param req {express.Request}
 * @param options {TMethodOnly}
 * @param context {IMethodContext}
 * @returns {Promise<object>}
 */
export async function getContextFields(
  req: express.Request,
  options: IMethodOnlyOptions,
  context: IMethodContext
): Promise<object> {
  if (options.only) {
    if (typeof options.only === 'function') {
      options.only = await options.only(context)
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

  return res.status(status).json({
    status,
    message: err.message || httpStatusCodes.getStatusText(status)
  })
}

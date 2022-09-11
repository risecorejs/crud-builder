import httpStatusCodes from 'http-status-codes'
import models from '@risecorejs/core/models'
import express from 'express'

import { ICreateMethodOptions } from './interfaces'

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
 * @param options {ICreateMethodOptions}
 * @return {Promise<object>}
 */
export async function getContextState(req: express.Request, options: ICreateMethodOptions): Promise<object> {
  if (options.state) {
    if (typeof options.state === 'function') {
      return await options.state(req)
    } else {
      return options.state
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
 * @param req {Object}
 * @param options {Object}
 * @param context {Object}
 * @return {Promise<void|Object>}
 */
export async function getValidationErrors(req, options, context) {
  if (options.validator !== false && options.rules) {
    if (typeof options.rules === 'function') {
      options.rules = await options.rules(context)
    }

    const errors = await req.validator(options.rules)

    if (errors) {
      return errors
    }
  }
}

/**
 * GET-CONTEXT-FIELDS
 * @param req {Object}
 * @param options {Object}
 * @param context {Object}
 * @returns {Promise<Object>}
 */
export async function getContextFields(req, options, context) {
  if (typeof options.only === 'function') {
    options.only = await options.only(context)
  }

  return options.only ? req.only(options.only) : req.body
}

/**
 * ERROR-RESPONSE
 * @param err {Object}
 * @param res {Object}
 * @return {any}
 */
export function errorResponse(err, res) {
  console.error(err)

  const status = err.status || err.response?.status || 500

  return res.status(status).json({
    status,
    message: err.message || httpStatusCodes.getStatusText(status)
  })
}

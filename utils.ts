import httpStatusCodes from 'http-status-codes'
import models from '@risecorejs/core/models'
import express from 'express'

import { FindOptions } from 'sequelize/types/model'

import { IMethodErrorResponse, IFields } from './interfaces'

import {
  CModel,
  IMethodQueryBuilderHandlerWithContext,
  IMethodQueryBuilderHandlerWithRequest,
  TGettingOptionsInstruction,
  TMethodKey,
  TMethodOnly,
  TMethodRules,
  TMethodState
} from './types'

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
 * GET-MODEL
 * @param model {any}
 * @return {typeof CModel}
 */
export function getModel(model: any): typeof CModel {
  if (typeof model === 'string') {
    const Model = models[model]

    if (Model) {
      return Model
    } else {
      throw Error(`Model "${model}" not found`)
    }
  } else {
    return model
  }
}

/**
 * GET-CONTEXT-STATE
 * @param req {express.Request}
 * @param state {undefined | TMethodState}
 * @param ctx {any}
 * @return {object | Promise<object>}
 */
export function getContextState(
  req: express.Request,
  state: undefined | TMethodState,
  ctx: any
): object | Promise<object> {
  if (state) {
    if (typeof state === 'function') {
      return state(ctx)
    } else {
      return state
    }
  } else {
    return {}
  }
}

/**
 * GET-VALIDATION-ERRORS
 * @param req {express.Request}
 * @param rules {TMethodRules}
 * @param ctx {any}
 * @return {Promise<null | object>}
 */
export async function getValidationErrors(req: express.Request, rules: TMethodRules, ctx: any): Promise<null | object> {
  if (typeof rules === 'function') {
    rules = await rules(ctx)
  }

  return req.validator(rules)
}

/**
 * GET-CONTEXT-FIELDS
 * @param req {express.Request}
 * @param only {undefined | TMethodOnly}
 * @param ctx {any}
 * @return {Promise<null | object>}
 */
export async function getContextFields(
  req: express.Request,
  only: undefined | TMethodOnly,
  ctx: any
): Promise<null | object> {
  if (only) {
    if (typeof only === 'function') {
      only = await only(ctx)
    }

    return req.only(only)
  } else {
    return req.body
  }
}

/**
 * GET-QUERY-OPTIONS
 */
export function getQueryOptions() {
  return {
    /**
     * MULTIPLE
     * @param req {express.Request}
     * @param queryBuilder {undefined | FindOptions | IMethodQueryBuilderHandlerWithRequest | IMethodQueryBuilderHandlerWithContext}
     * @param ctx {any?}
     * @return {FindOptions | Promise<FindOptions>}
     */
    multiple(
      req: express.Request,
      queryBuilder:
        | undefined
        | FindOptions
        | IMethodQueryBuilderHandlerWithRequest
        | IMethodQueryBuilderHandlerWithContext,
      ctx?: any
    ): FindOptions | Promise<FindOptions> {
      if (queryBuilder) {
        if (typeof queryBuilder === 'function') {
          return queryBuilder(ctx || req)
        } else {
          return queryBuilder
        }
      } else {
        return {}
      }
    },

    /**
     * SINGLE
     * @param req {express.Request}
     * @param key {undefined | TMethodKey}
     * @param queryBuilder {undefined | FindOptions | IMethodQueryBuilderHandlerWithRequest | IMethodQueryBuilderHandlerWithContext}
     * @param ctx {any?}
     * @return {Promise<FindOptions>}
     */
    async single(
      req: express.Request,
      key: undefined | TMethodKey,
      queryBuilder:
        | undefined
        | FindOptions
        | IMethodQueryBuilderHandlerWithRequest
        | IMethodQueryBuilderHandlerWithContext,
      ctx?: any
    ): Promise<FindOptions> {
      const queryOptions: IFields = {
        where: {}
      }

      if (key !== false) {
        key ||= 'id'

        queryOptions.where[key] = req.params[key]
      }

      if (queryBuilder) {
        if (typeof queryBuilder === 'function') {
          const _queryOptions = await queryBuilder(ctx || req)

          if (_queryOptions.where) {
            Object.assign(queryOptions.where, _queryOptions.where)

            delete _queryOptions.where
          }

          Object.assign(queryOptions, _queryOptions)
        } else {
          if (queryBuilder.where) {
            Object.assign(queryOptions.where, queryBuilder.where)

            delete queryBuilder.where
          }

          Object.assign(queryOptions, queryBuilder)
        }
      }

      return queryOptions
    }
  }
}

/**
 * ERROR-RESPONSE
 * @param err {any}
 * @param res {express.Response}
 * @return {any}
 */
export function errorResponse(err: any, res: express.Response) {
  if (err.consoleError !== false) {
    console.error(err)
  }

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

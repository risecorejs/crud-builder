import express from 'express'
import httpStatusCodes from 'http-status-codes'

import {
  getMethodOptions,
  getContextState,
  getQueryOptions,
  getValidationErrors,
  getContextFields,
  errorResponse
} from '../utils'

import { IMethodUpdateOptions, IMethodUpdateContextOptions } from '../interfaces'
import { CModel, TGettingOptionsInstruction } from '../types'

/**
 * UPDATE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodUpdateOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodUpdateOptions>(gettingOptionsInstruction)

      const ctx: IMethodUpdateContextOptions = {
        req,
        res
      }

      ctx.state = await getContextState(req, options.state, ctx)

      const queryOptions = await getQueryOptions().single(req, options.key, options.queryBuilder, ctx)

      ctx.instance = await Model.findOne(queryOptions)

      if (!ctx.instance) {
        const status = 404

        return res.status(status).json({
          status,
          message: 'Not found'
        })
      }

      if (options.validator !== false && options.rules) {
        const errors = await getValidationErrors(req, options.rules, ctx)

        if (errors) {
          const status = 400

          return res.status(status).json({
            status,
            message: 'Validation errors',
            errors
          })
        }
      }

      ctx.fields = await getContextFields(req, options.only, ctx)

      if (options.formatter) {
        await options.formatter(<any>ctx)
      }

      if (options.beforeUpdate) {
        await options.beforeUpdate(<any>ctx)
      }

      if (ctx.fields) {
        await ctx.instance.update(ctx.fields)
      }

      if (options.afterUpdate) {
        await options.afterUpdate(<any>ctx)
      }

      const status = 200

      if (options.sendStatus) {
        return res.sendStatus(status)
      }

      if (options.response) {
        const response = await options.response(<any>ctx)

        return res.status(response.status || status).json(response)
      }

      return res.status(status).json({
        status,
        message: httpStatusCodes.getStatusText(status),
        result: ctx.instance
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

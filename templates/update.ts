import express from 'express'

import {
  getMethodOptions,
  getContextState,
  getModel,
  getContextFields,
  getQueryOptions,
  getValidationErrors,
  errorResponse
} from '../utils'

import { IMethodContext, IMethodUpdateOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'
import httpStatusCodes from 'http-status-codes'

/**
 * UPDATE
 * @param Model {object}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: object,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodUpdateOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options: IMethodUpdateOptions = getMethodOptions(gettingOptionsInstruction)

      const ctx: IMethodContext = {
        req,
        res,
        state: await getContextState(req, options),
        fields: null,
        instance: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = await getQueryOptions().single(req, options, ctx)

      // @ts-ignore
      ctx.instance = await Model.findOne(queryOptions)

      if (!ctx.instance) {
        const status = 404

        return res.status(status).json({
          status,
          message: 'Not found'
        })
      }

      const errors = await getValidationErrors(req, options, ctx)

      if (errors) {
        const status = 400

        return res.status(status).json({
          status,
          message: 'Validation errors',
          errors
        })
      }

      ctx.fields = await getContextFields(req, options, ctx)

      if (options.formatter) {
        await options.formatter(ctx)
      }

      if (options.beforeUpdate) {
        await options.beforeUpdate(ctx)
      }

      if (ctx.fields) {
        // @ts-ignore
        await ctx.instance.update(ctx.fields)
      }

      if (options.afterUpdate) {
        await options.afterUpdate(ctx)
      }

      const status = 200

      if (options.sendStatus) {
        return res.sendStatus(status)
      }

      if (options.response) {
        const response = await options.response(ctx)

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

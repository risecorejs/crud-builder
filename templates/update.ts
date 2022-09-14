import express from 'express'
import httpStatusCodes from 'http-status-codes'
import { Model } from 'sequelize'

import {
  getMethodOptions,
  getContextState,
  getQueryOptions,
  getValidationErrors,
  getContextFields,
  errorResponse
} from '../utils'

import { IMethodUpdateOptions, IMethodContextOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * UPDATE
 * @param Model {object}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: Model,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodUpdateOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodUpdateOptions>(gettingOptionsInstruction)

      const ctx: IMethodContextOptions = {
        req,
        res,
        state: await getContextState(req, options),
        fields: null,
        instance: null
      }

      const queryOptions = await getQueryOptions().single(req, options, ctx)

      // @ts-ignore
      ctx.instance = <null | object>await Model.findOne(queryOptions)

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

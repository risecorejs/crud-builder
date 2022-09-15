import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getContextState, getQueryOptions, errorResponse } from '../utils'

import { IMethodDestroyOptions, IMethodContextOptionsWithoutFields, IFields } from '../interfaces'
import { CModel, TGettingOptionsInstruction } from '../types'

/**
 * DESTROY
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodDestroyOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodDestroyOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodDestroyOptions>(gettingOptionsInstruction)

      const ctx: IMethodContextOptionsWithoutFields = {
        req,
        res,
        state: await getContextState(req, options),
        instance: null
      }

      const queryOptions = await getQueryOptions().single(req, options, ctx)

      ctx.instance = await Model.findOne(queryOptions)

      if (!ctx.instance) {
        const status = 404

        return res.status(status).json({
          status,
          message: 'Not found'
        })
      }

      const destroyOptions: IFields = {}

      if (options.force) {
        if (typeof options.force === 'function') {
          destroyOptions.force = await options.force(ctx)
        } else {
          destroyOptions.force = true
        }
      }

      if (options.beforeDestroy) {
        await options.beforeDestroy(ctx)
      }

      await ctx.instance.destroy(destroyOptions)

      if (options.afterDestroy) {
        await options.afterDestroy(ctx)
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

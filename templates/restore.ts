import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getContextState, getQueryOptions, errorResponse } from '../utils'

import { IMethodRestoreOptions, IMethodContextOptionsWithoutFields } from '../interfaces'
import { CModel, TGettingOptionsInstruction } from '../types'

/**
 * RESTORE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodRestoreOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodRestoreOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodRestoreOptions>(gettingOptionsInstruction)

      const ctx: IMethodContextOptionsWithoutFields = {
        req,
        res,
        state: await getContextState(req, options),
        instance: null
      }

      const queryOptions = await getQueryOptions().single(req, options.key, options.queryBuilder, ctx)

      queryOptions.paranoid = false

      ctx.instance = await Model.findOne(queryOptions)

      if (!ctx.instance) {
        const status = 404

        return res.status(status).json({
          status,
          message: 'Not found'
        })
      }

      if (options.beforeRestore) {
        await options.beforeRestore(ctx)
      }

      await ctx.instance.restore()

      if (options.afterRestore) {
        await options.afterRestore(ctx)
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

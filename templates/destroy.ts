import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { DestroyOptions } from 'sequelize/types/model'

import { getMethodOptions, getContextState, getQueryOptions, errorResponse } from '../utils'

import { IMethodDestroyOptions, IMethodDestroyContextOptions } from '../interfaces'
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

      const ctx: IMethodDestroyContextOptions = {
        req,
        res,
        state: {}
      }

      if (options.state) {
        ctx.state = await getContextState(req, options, ctx)
      }

      const queryOptions = await getQueryOptions().single(req, options.key, options.queryBuilder, ctx)

      ctx.instance = await Model.findOne(queryOptions)

      if (!ctx.instance) {
        const status = 404

        return res.status(status).json({
          status,
          message: 'Not found'
        })
      }

      const destroyOptions: DestroyOptions = {}

      if (options.force) {
        if (typeof options.force === 'function') {
          destroyOptions.force = await options.force(<any>ctx)
        } else {
          destroyOptions.force = true
        }
      }

      if (options.beforeDestroy) {
        await options.beforeDestroy(<any>ctx)
      }

      await ctx.instance.destroy(destroyOptions)

      if (options.afterDestroy) {
        await options.afterDestroy(<any>ctx)
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

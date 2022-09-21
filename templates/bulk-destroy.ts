import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { FindOptions } from 'sequelize/types/model'

import { getMethodOptions, getContextState, getQueryOptions, errorResponse } from '../utils'

import { IMethodBulkDestroyOptions, IMethodBulkDestroyContextOptions } from '../interfaces'
import { CModel, TGettingOptionsInstruction } from '../types'

/**
 * BULK-DESTROY
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkDestroyOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkDestroyOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodBulkDestroyOptions>(gettingOptionsInstruction)

      const ctx: IMethodBulkDestroyContextOptions = {
        req,
        res,
        state: {}
      }

      if (options.state) {
        ctx.state = await getContextState(req, options.state, ctx)
      }

      const queryOptions: FindOptions & { force?: boolean } = await getQueryOptions().multiple(
        req,
        options.queryBuilder,
        ctx
      )

      if (options.force) {
        if (typeof options.force === 'function') {
          queryOptions.force = await options.force(ctx)
        } else {
          queryOptions.force = true
        }
      }

      if (options.beforeDestroy) {
        await options.beforeDestroy(ctx)
      }

      ctx.count = await Model.destroy(queryOptions)

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
        result: ctx.count
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

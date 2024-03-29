import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getContextState, getQueryOptions, errorResponse } from '../utils'

import { M } from '../classes'
import { IMethodBulkRestoreOptions, IMethodBulkRestoreContextOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * BULK-RESTORE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkRestoreOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof M,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkRestoreOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodBulkRestoreOptions>(gettingOptionsInstruction)

      const ctx: IMethodBulkRestoreContextOptions = {
        req,
        res,
        state: {}
      }

      if (options.state) {
        ctx.state = await getContextState(req, options, ctx)
      }

      const queryOptions = await getQueryOptions().multiple(options.queryBuilder, ctx)

      if (options.beforeRestore) {
        await options.beforeRestore(ctx)
      }

      await Model.restore(queryOptions)

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
        message: httpStatusCodes.getStatusText(status)
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

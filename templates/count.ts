import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getQueryOptions, errorResponse } from '../utils'

import { M } from '../classes'
import { IMethodCountOptions, IMethodCountContextOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * COUNT
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCountOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof M,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCountOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodCountOptions>(gettingOptionsInstruction)

      const ctx: IMethodCountContextOptions = {
        req,
        res
      }

      const queryOptions = await getQueryOptions().multiple(options.queryBuilder, ctx)

      ctx.count = await Model.count(queryOptions)

      const status = 200

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

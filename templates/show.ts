import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getQueryOptions, errorResponse } from '../utils'

import { M } from '../classes'
import { IMethodShowContextOptions, IMethodShowOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * FIND-ONE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodShowOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof M,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodShowOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodShowOptions>(gettingOptionsInstruction)

      const ctx: IMethodShowContextOptions = {
        req,
        res
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

      const status = 200

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

import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getQueryOptions, errorResponse } from '../utils'

import { IMethodFindOneOptions } from '../interfaces'
import { CModel, TGettingOptionsInstruction } from '../types'

/**
 * FIND-ONE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodFindOneOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodFindOneOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodFindOneOptions>(gettingOptionsInstruction)

      const queryOptions = await getQueryOptions().single(req, options.key, options.queryBuilder)

      const instance = await Model.findOne(queryOptions)

      if (!instance) {
        const status = 404

        return res.status(status).json({
          status,
          message: 'Not found'
        })
      }

      const status = 200

      if (options.response) {
        const response = await options.response(instance, req)

        return res.status(response.status || status).json(response)
      }

      return res.status(status).json({
        status,
        message: httpStatusCodes.getStatusText(status),
        result: instance
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

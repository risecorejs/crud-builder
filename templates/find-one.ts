import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getModel, getQueryOptions, errorResponse } from '../utils'

import { IMethodFindOneOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * FIND-ONE
 * @param Model {object}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: object,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodFindOneOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodFindOneOptions>(gettingOptionsInstruction)

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = await getQueryOptions().single(req, options)

      // @ts-ignore
      const instance = await Model.findOne(queryOptions)

      if (!instance) {
        return res.sendStatus(404)
      }

      const status = 200

      if (options.sendStatus) {
        return res.sendStatus(status)
      }

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

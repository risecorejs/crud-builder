import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getModel, getQueryOptions, errorResponse } from '../utils'

import { IMethodCountOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * COUNT
 * @param Model {object}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCountOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: object,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCountOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodCountOptions>(gettingOptionsInstruction)

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = await getQueryOptions().multiple(req, options)

      // @ts-ignore
      const count: number = await Model.count(queryOptions)

      const status = 200

      return res.status(status).json({
        status,
        message: httpStatusCodes.getStatusText(status),
        count
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

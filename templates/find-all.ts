import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { CModel, TGettingOptionsInstruction } from '../types'
import { IFields, IMethodFindAllOptions } from '../interfaces'

import { getQueryOptions, errorResponse, getMethodOptions } from '../utils'

/**
 * FIND-ALL
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodFindAllOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodFindAllOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodFindAllOptions>(gettingOptionsInstruction)

      options.method ||= 'findAndCountAll'

      const queryOptions: IFields = {
        order: [['id', 'DESC']]
      }

      if (options.method === 'findAndCountAll') {
        queryOptions.distinct = true
      }

      if (options.pagination !== false) {
        Object.assign(queryOptions, req.pagination())
      }

      const _queryOptions = await getQueryOptions().multiple(req, options)

      Object.assign(queryOptions, _queryOptions)

      const instances = await Model[options.method](queryOptions)

      const status = 200

      if (options.response) {
        const response = await options.response(instances, req)

        return res.status(response.status || status).json(response)
      }

      return res.json({
        status,
        message: httpStatusCodes.getStatusText(status),
        result: instances
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

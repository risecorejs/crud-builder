import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { FindOptions } from 'sequelize'

import { M } from '../classes'
import { IMethodIndexContextOptions, IMethodIndexOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

import { getQueryOptions, errorResponse, getMethodOptions } from '../utils'

/**
 * FIND-ALL
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodIndexOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof M,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodIndexOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodIndexOptions>(gettingOptionsInstruction)

      const ctx: IMethodIndexContextOptions = {
        req,
        res
      }

      options.method ||= 'findAndCountAll'

      const queryOptions: FindOptions & { distinct?: boolean } = {
        order: [['id', 'DESC']]
      }

      if (options.method === 'findAndCountAll') {
        queryOptions.distinct = true
      }

      if (options.pagination !== false) {
        Object.assign(queryOptions, req.pagination())
      }

      const _queryOptions = await getQueryOptions().multiple(options.queryBuilder, ctx)

      Object.assign(queryOptions, _queryOptions)

      ctx.instances = await Model[options.method](queryOptions)

      const status = 200

      if (options.response) {
        const response = await options.response(<any>ctx)

        return res.status(response.status || status).json(response)
      }

      return res.json({
        status,
        message: httpStatusCodes.getStatusText(status),
        result: ctx.instances
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

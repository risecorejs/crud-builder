import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { UpdateOptions } from 'sequelize'

import {
  getMethodOptions,
  getContextState,
  getQueryOptions,
  getValidationErrors,
  getContextFields,
  errorResponse
} from '../utils'

import { M } from '../classes'
import { IMethodBulkUpdateOptions, IMethodBulkUpdateContextOptions } from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * BULK-UPDATE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof M,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkUpdateOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodBulkUpdateOptions>(gettingOptionsInstruction)

      const ctx: IMethodBulkUpdateContextOptions = {
        req,
        res,
        state: {},
        fields: null
      }

      if (options.state) {
        ctx.state = await getContextState(req, options, ctx)
      }

      if (options.validator !== false && options.rules) {
        const errors = await getValidationErrors(req, options.rules, ctx)

        if (errors) {
          const status = 400

          return res.status(status).json({
            status,
            message: 'Validation errors',
            errors
          })
        }
      }

      ctx.fields = await getContextFields(req, options.only, ctx)

      if (options.formatter) {
        await options.formatter(ctx)
      }

      if (options.beforeUpdate) {
        await options.beforeUpdate(ctx)
      }

      if (ctx.fields) {
        const queryOptions = <UpdateOptions>await getQueryOptions().multiple(options.queryBuilder, ctx)

        await Model.update(ctx.fields, queryOptions)
      }

      if (options.afterUpdate) {
        await options.afterUpdate(ctx)
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
        message: httpStatusCodes.getStatusText(status)
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

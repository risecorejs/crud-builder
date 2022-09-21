import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getContextState, getValidationErrors, getContextFields, errorResponse } from '../utils'

import { IMethodCreateOptions, IMethodCreateContextOptions } from '../interfaces'
import { CModel, TGettingOptionsInstruction } from '../types'

/**
 * CREATE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCreateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCreateOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodCreateOptions>(gettingOptionsInstruction)

      const ctx: IMethodCreateContextOptions = {
        req,
        res,
        state: {},
        fields: null
      }

      if (options.state) {
        ctx.state = await getContextState(req, options.state, ctx)
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

      if (options.beforeCreate) {
        await options.beforeCreate(ctx)
      }

      ctx.instance = await Model.create(<any>ctx.fields)

      if (options.afterCreate) {
        await options.afterCreate(<any>ctx)
      }

      const status = 201

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
        result: ctx.instance
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

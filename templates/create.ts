import express from 'express'
import { Model } from 'sequelize'
import httpStatusCodes from 'http-status-codes'

import { getMethodOptions, getContextState, getValidationErrors, getContextFields, errorResponse } from '../utils'

import {
  IMethodCreateOptions,
  IMethodContextOptions,
  IFields,
  IMethodContextOptionsWithoutInstance
} from '../interfaces'
import { TGettingOptionsInstruction } from '../types'

/**
 * CREATE
 * @param Model {object}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCreateOptions>)}
 * @return {express.Handler}
 */
export default function (
  Model: Model,
  gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCreateOptions>
): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getMethodOptions<IMethodCreateOptions>(gettingOptionsInstruction)

      const ctx: IMethodContextOptions = {
        req,
        res,
        state: await getContextState(req, options.state),
        fields: null,
        instance: null
      }

      const errors = await getValidationErrors(req, options, ctx)

      if (errors) {
        const status = 400

        return res.status(status).json({
          status,
          message: 'Validation errors',
          errors
        })
      }

      ctx.fields = await getContextFields(req, options, ctx)

      if (options.formatter) {
        await options.formatter(ctx)
      }

      if (options.beforeCreate) {
        await options.beforeCreate(ctx)
      }

      // @ts-ignore
      ctx.instance = <IFields>await Model.create(ctx.fields)

      if (options.afterCreate) {
        await options.afterCreate(<IMethodContextOptionsWithoutInstance & { instance: Model }>ctx)
      }

      const status = 201

      if (options.sendStatus) {
        return res.sendStatus(status)
      }

      if (options.response) {
        const response = await options.response(ctx)

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

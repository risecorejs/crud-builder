import express from 'express'
import httpStatusCodes from 'http-status-codes'

import { getContextState, getModel, getValidationErrors, errorResponse, getContextFields } from '../utils'

import { IMethodContext, IMethodCreateOptions } from '../interfaces'

/**
 * CREATE
 * @param getOptions {() => IMethodCreateOptions)}
 * @param Model {object}
 * @return {express.Handler}
 */
export default function (getOptions: () => IMethodCreateOptions, Model: object): express.Handler {
  return async (req: express.Request, res: express.Response) => {
    try {
      const options = getOptions()

      const context: IMethodContext = {
        req,
        res,
        state: await getContextState(req, options.state),
        fields: {},
        instance: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const errors = await getValidationErrors(req, options, context)

      if (errors) {
        const status = 400

        return res.status(status).json({
          status,
          message: 'Validation errors',
          errors
        })
      }

      context.fields = await getContextFields(req, options, context)

      if (options.formatter) {
        await options.formatter(context)
      }

      if (options.beforeCreate) {
        await options.beforeCreate(context)
      }

      // @ts-ignore
      context.instance = await Model.create(context.fields)

      if (options.afterCreate) {
        await options.afterCreate(context)
      }

      const status = 201

      if (options.sendStatus) {
        return res.sendStatus(status)
      }

      if (options.response) {
        const response = await options.response(context)

        return res.status(response.status || status).json(response)
      }

      return res.status(status).json({
        status,
        message: httpStatusCodes.getStatusText(status),
        result: context.instance
      })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

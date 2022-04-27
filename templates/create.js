const {
  decoratorGetOptions,
  getContextState,
  getModel,
  getValidationErrors,
  getContextFields,
  errorResponse
} = require('../utils')

/**
 * CREATE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   validator: boolean?,
 *   rules: Object|Function?,
 *   only: string|Object|Array|Function?,
 *   formatter: Function?,
 *   beforeCreate: Function?,
 *   afterCreate: Function?,
 *   sendStatus: boolean,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
module.exports = (getOptions, Model) => async (req, res) => {
  try {
    const options = decoratorGetOptions(getOptions)

    const context = {
      req,
      res,
      state: await getContextState(req, options),
      fields: null,
      instance: null
    }

    if (options.model) {
      Model = getModel(options.model)
    }

    const errors = await getValidationErrors(req, options, context)

    if (errors) {
      return res.status(400).json({ errors })
    }

    context.fields = await getContextFields(req, options, context)

    if (options.formatter) {
      await options.formatter(context)
    }

    if (options.beforeCreate) {
      await options.beforeCreate(context)
    }

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

      return res.status(status).json(response)
    }

    return res.status(status).json({
      status,
      result: context.instance
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

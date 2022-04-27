const {
  decoratorGetOptions,
  getContextState,
  getModel,
  getValidationErrors,
  getContextFields,
  errorResponse,
  getQueryOptions
} = require('../utils')

/**
 * UPDATE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   key: "id" | string | false?,
 *   queryBuilder: Object|Function?,
 *   validator: boolean?,
 *   rules: Object|Function?,
 *   only: string|Object|Array|Function?,
 *   formatter: Function?,
 *   beforeUpdate: Function?,
 *   afterUpdate: Function?,
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

    const queryOptions = await getQueryOptions().type2(req, options, context)

    context.instance = await Model.findOne(queryOptions)

    if (!context.instance) {
      return res.sendStatus(404)
    }

    const errors = await getValidationErrors(req, options, context)

    if (errors) {
      return res.status(400).json({ errors })
    }

    context.fields = await getContextFields(req, options, context)

    if (options.formatter) {
      await options.formatter(context)
    }

    if (options.beforeUpdate) {
      await options.beforeUpdate(context)
    }

    if (context.fields) {
      await context.instance.update(context.fields)
    }

    if (options.afterUpdate) {
      await options.afterUpdate(context)
    }

    const status = 200

    if (options.sendStatus) {
      return res.sendStatus(status)
    }

    if (options.response) {
      const response = await options.response(context)

      return res.json(response)
    }

    return res.json({
      status,
      result: context.instance
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

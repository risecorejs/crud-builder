const { decoratorGetOptions, getContextState, getModel, getQueryOptions, errorResponse } = require('../utils')

/**
 * BULK-DESTROY
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   queryBuilder: Object|Function?,
 *   force: boolean?,
 *   beforeDestroy: Function?,
 *   afterDestroy: Function?,
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
      result: null
    }

    if (options.model) {
      Model = getModel(options.model)
    }

    const queryOptions = await getQueryOptions().type1(req, options, context)

    if (options.force) {
      if (typeof options.force === 'function') {
        queryOptions.force = await options.force(context)
      } else {
        queryOptions.force = true
      }
    }

    if (options.beforeDestroy) {
      await options.beforeDestroy(context)
    }

    context.result = await Model.destroy(queryOptions)

    if (options.afterDestroy) {
      await options.afterDestroy(context)
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
      result: context.result
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

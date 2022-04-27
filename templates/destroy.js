const { decoratorGetOptions, getContextState, getModel, getQueryOptions, errorResponse } = require('../utils')

/**
 * DESTROY
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   key: "id" | string | false?,
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

    const destroyOptions = {}

    if (options.force) {
      if (typeof options.force === 'function') {
        destroyOptions.force = await options.force(context)
      } else {
        destroyOptions.force = true
      }
    }

    if (options.beforeDestroy) {
      await options.beforeDestroy(context)
    }

    await context.instance.destroy(destroyOptions)

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
      result: context.instance
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

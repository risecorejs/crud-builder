const { decoratorGetOptions, getContextState, getModel, getQueryOptions, errorResponse } = require('../utils')

/**
 * RESTORE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   key: "id" | string | false?,
 *   queryBuilder: Object|Function?,
 *   beforeRestore: Function?,
 *   afterRestore: Function?,
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

    queryOptions.paranoid = false

    context.instance = await Model.findOne(queryOptions)

    if (!context.instance) {
      return res.sendStatus(404)
    }

    if (options.beforeRestore) {
      await options.beforeRestore(context)
    }

    await context.instance.restore()

    if (options.afterRestore) {
      await options.afterRestore(context)
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

const { decoratorGetOptions, getModel, getQueryOptions, errorResponse } = require('../utils')

/**
 * FIND-ONE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   key: "id" | string | false?,
 *   queryBuilder: Object|Function?,
 *   sendStatus: boolean,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
module.exports = (getOptions, Model) => async (req, res) => {
  try {
    const options = decoratorGetOptions(getOptions)

    if (options.model) {
      Model = getModel(options.model)
    }

    const queryOptions = await getQueryOptions().type2(req, options)

    const instance = await Model.findOne(queryOptions)

    if (!instance) {
      return res.sendStatus(404)
    }

    const status = 200

    if (options.sendStatus) {
      return res.sendStatus(status)
    }

    if (options.response) {
      const response = await options.response(instance, req)

      return res.json(response)
    }

    return res.json({
      status,
      result: instance
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

const { decoratorGetOptions, getModel, getQueryOptions, errorResponse } = require('../utils')

/**
 * FIND-ALL
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   method: "findAndCountAll"|"findAll"?,
 *   pagination: boolean?,
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

    options.method ||= 'findAndCountAll'

    const queryOptions = {
      order: [['id', 'DESC']]
    }

    if (options.method === 'findAndCountAll') {
      queryOptions.distinct = true
    }

    if (options.pagination !== false) {
      Object.assign(queryOptions, req.pagination())
    }

    const _queryOptions = await getQueryOptions().type1(req, options)

    Object.assign(queryOptions, _queryOptions)

    const instances = await Model[options.method](queryOptions)

    const status = 200

    if (options.sendStatus) {
      return res.sendStatus(status)
    }

    if (options.response) {
      const response = await options.response(instances, req)

      return res.json(response)
    }

    return res.json({
      status,
      result: instances
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

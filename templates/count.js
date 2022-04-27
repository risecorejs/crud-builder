const { decoratorGetOptions, getModel, getQueryOptions, errorResponse } = require('../utils')

/**
 * COUNT
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   queryBuilder: Object|Function?
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

    const queryOptions = await getQueryOptions().type1(req, options)

    const count = await Model.count(queryOptions)

    return res.json({
      status: 200,
      count
    })
  } catch (err) {
    return errorResponse(err, res)
  }
}

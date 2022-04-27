const { getModel } = require('./utils')

const templates = require('./templates')

/**
 * CRUD-BUILDER
 * @param options {{
 *   model: string|Object,
 *   endpoints: Object
 * }}
 * @return {Object}
 */
module.exports = (options) => {
  const endpoints = {}

  const Model = getModel(options.model)

  for (const endpoint in options.endpoints) {
    if (options.endpoints.hasOwnProperty(endpoint)) {
      const getEndpointOptions =
        typeof options.endpoints[endpoint] === 'function'
          ? options.endpoints[endpoint]
          : () => options.endpoints[endpoint]

      const endpointOptions = getEndpointOptions()

      if (endpointOptions) {
        const handler = templates[endpoint]

        if (handler) {
          endpoints[endpoint] = handler(getEndpointOptions, Model)
        } else if (endpointOptions.template) {
          const _handler = templates[endpointOptions.template]

          if (_handler) {
            endpoints[endpoint] = _handler(getEndpointOptions, Model)
          } else {
            throw Error(`Template "${endpointOptions.template}" not found`)
          }
        }
      }
    }
  }

  return endpoints
}

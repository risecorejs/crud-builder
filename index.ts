const { getModel } = require('./utils')

const templates = require('./templates')

import { IOptions, IEndpoints, IEndpointBaseOptions } from './interfaces'

/**
 * CRUD-BUILDER
 * @param options {IOptions}
 * @return {IEndpoints}
 */
export default function (options: IOptions): IEndpoints {
  const endpoints: IEndpoints = {}

  const Model = getModel(options.model)

  for (const [key, endpoint] of Object.entries(options.endpoints)) {
    const endpointOptions = getEndpointOptions(endpoint)

    if (templates.has(key)) {
      endpoints[key] = templates.get(key).apply(null, [getEndpointOptions, Model])
    } else if (endpointOptions.template) {
      if (templates.has(endpointOptions.template)) {
        endpoints[key] = templates.get(endpointOptions.template).apply(null, [getEndpointOptions, Model])
      } else {
        throw Error(`Template "${endpointOptions.template}" not found`)
      }
    }
  }

  return endpoints
}

function getEndpointOptions(endpoint: object | Function): IEndpointBaseOptions {
  return typeof endpoint === 'function' ? endpoint() : endpoint
}

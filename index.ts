import { getMethodOptions, getModel } from './utils'
import templates from './templates'

import { IOptions, IEndpoints, IMethodBaseOptions } from './interfaces'

/**
 * CRUD-BUILDER
 * @param options {IOptions}
 * @return {IEndpoints}
 */
export default function (options: IOptions): IEndpoints {
  const endpoints: IEndpoints = {}

  const Model = getModel(options.model)

  for (const [key, value] of Object.entries(options.methods)) {
    const methodOptions: true | IMethodBaseOptions = getMethodOptions(value)

    if (methodOptions === true) {
      fillingEndpoints(endpoints, key, value, Model)
    } else {
      fillingEndpoints(endpoints, methodOptions.template || key, value, Model)
    }
  }

  return endpoints
}

/**
 * FILLING-ENDPOINTS
 * @param endpoints {IEndpoints}
 * @param key {string}
 * @param value {true | (() => any)}
 * @param Model {object}
 */
function fillingEndpoints(endpoints: IEndpoints, key: string, value: true | (() => any), Model: object) {
  if (templates.has(key)) {
    endpoints[key] = templates.get(key).apply(null, [value, Model])
  } else {
    throw Error(`Template "${key}" not found`)
  }
}

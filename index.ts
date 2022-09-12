import { getModel } from './utils'

const templates = require('./templates')

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
    const methodOptions = getMethodOptions(value)

    if (methodOptions === true) {
      if (templates.has(key)) {
        endpoints[key] = templates.get(key).apply(null, [getMethodOptions, Model])
      } else {
        throw Error(`Template "${key}" not found`)
      }
    } else {
      if (templates.has(methodOptions.template || key)) {
        endpoints[key] = templates.get(methodOptions.template || key).apply(null, [getMethodOptions, Model])
      } else {
        throw Error(`Template "${methodOptions.template || key}" not found`)
      }
    }
  }

  return endpoints
}

/**
 * GET-METHOD-OPTIONS
 * @param methodOptions {true | object | (() => any)}
 * @return {IMethodBaseOptions}
 */
function getMethodOptions(methodOptions: true | object | (() => any)): IMethodBaseOptions {
  if (methodOptions === true) {
    return {}
  } else if (typeof methodOptions === 'function') {
    return methodOptions()
  } else {
    return methodOptions
  }
}

import { getModel } from './utils'

const templates = require('./templates')

import { IOptions, IEndpoints, IBaseMethodOptions } from './interfaces'

/**
 * CRUD-BUILDER
 * @param options {IOptions}
 * @return {IEndpoints}
 */
export default function (options: IOptions): IEndpoints {
  const endpoints: IEndpoints = {}

  const Model = getModel(options.model)

  for (const [key, method] of Object.entries(options.methods)) {
    const methodOptions = getMethodOptions(method)

    if (templates.has(key)) {
      endpoints[key] = templates.get(key).apply(null, [getMethodOptions, Model])
    } else if (methodOptions !== true && methodOptions.template) {
      if (templates.has(methodOptions.template)) {
        endpoints[key] = templates.get(methodOptions.template).apply(null, [getMethodOptions, Model])
      } else {
        throw Error(`Template "${methodOptions.template}" not found`)
      }
    }
  }

  return endpoints
}

/**
 * GET-METHOD-OPTIONS
 * @param method {true | object | (() => any)}
 * @return {true | IBaseMethodOptions}
 */
function getMethodOptions(method: true | object | (() => any)): true | IBaseMethodOptions {
  return typeof method === 'function' ? method() : method
}

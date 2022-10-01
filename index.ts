import { getMethodOptions, getModel } from './utils'
import templates from './templates/templates'

import { IMethods, IEndpoints, IMethodBaseOptions } from './interfaces'
import { TTemplates } from './types'

/**
 * CRUD-BUILDER
 * @param model {any}
 * @param methods {IMethods}
 * @return {IEndpoints}
 */
export default function <M = any>(model: any, methods: IMethods<M>): IEndpoints {
  const endpoints: IEndpoints = {}

  for (const [methodName, gettingOptionsInstruction] of Object.entries(methods)) {
    const methodOptions = getMethodOptions<IMethodBaseOptions>(gettingOptionsInstruction)

    const Model = getModel(methodOptions.model || model)

    const templateName = methodOptions.template || <TTemplates>methodName

    const template = templates[templateName]

    if (template) {
      endpoints[methodName] = template(Model, gettingOptionsInstruction)
    } else {
      throw Error(`Template "${templateName}" not found`)
    }
  }

  return endpoints
}

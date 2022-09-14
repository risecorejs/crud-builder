import { getModel, getMethodOptions } from './utils'
import templates from './templates'

import { IMethods, IEndpoints } from './interfaces'
import { TModel, TTemplates } from './types'

/**
 * CRUD-BUILDER
 * @param model {TModel}
 * @param methods {IMethods}
 * @return {IEndpoints}
 */
export default function (model: TModel, methods: IMethods): IEndpoints {
  const endpoints: IEndpoints = {}

  const Model = getModel(model)

  for (const [methodName, gettingOptionsInstruction] of Object.entries(methods)) {
    const methodOptions: { template?: TTemplates } = getMethodOptions(gettingOptionsInstruction)

    const templateName = methodOptions.template || methodName

    const template = templates[templateName]

    if (template) {
      endpoints[methodName] = template(Model, gettingOptionsInstruction)
    } else {
      throw Error(`Template "${templateName}" not found`)
    }
  }

  return endpoints
}

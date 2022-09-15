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

  for (const [methodName, gettingOptionsInstruction] of Object.entries(methods)) {
    const methodOptions = getMethodOptions<{ template?: TTemplates; model?: TModel }>(gettingOptionsInstruction)

    model = methodOptions.model || model

    const Model = getModel(model)

    if (!Model) throw Error(`Model "${model}" not found`)

    const templateName = <TTemplates>(methodOptions.template || methodName)

    const template = templates[templateName]

    if (template) {
      endpoints[methodName] = template(Model, gettingOptionsInstruction)
    } else {
      throw Error(`Template "${templateName}" not found`)
    }
  }

  return endpoints
}

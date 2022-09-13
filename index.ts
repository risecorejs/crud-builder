import _ from 'lodash'

import { getModel, getMethodOptions } from './utils'
import templates from './templates'

import { IMethods, IEndpoints, IMethodBaseOptions } from './interfaces'
import { TGettingOptionsInstruction } from './types'

/**
 * CRUD-BUILDER
 * @param model {string | object}
 * @param methods {IMethods}
 * @return {IEndpoints}
 */
export default function (model: string | object, methods: IMethods): IEndpoints {
  const endpoints: IEndpoints = {}

  const Model = getModel(model)

  for (const [methodName, gettingOptionsInstruction] of Object.entries(methods)) {
    const methodOptions: IMethodBaseOptions = getMethodOptions(gettingOptionsInstruction)

    if (_.isEmpty(methodOptions)) {
      fillingEndpoints(endpoints, Model, methodName, gettingOptionsInstruction)
    } else {
      fillingEndpoints(endpoints, Model, methodOptions.template || methodName, gettingOptionsInstruction)
    }
  }

  return endpoints
}

/**
 * FILLING-ENDPOINTS
 * @param endpoints {IEndpoints}
 * @param Model {object}
 * @param methodName {string}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<any>>}
 */
function fillingEndpoints(
  endpoints: IEndpoints,
  Model: object,
  methodName: string,
  gettingOptionsInstruction: TGettingOptionsInstruction<any>
) {
  const template = templates[methodName]

  if (template) {
    endpoints[methodName] = template(Model, gettingOptionsInstruction)
  } else {
    throw Error(`Template "${methodName}" not found`)
  }
}

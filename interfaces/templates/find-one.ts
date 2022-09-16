import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions } from '../index'
import { IMethodQueryBuilderHandlerWithRequest, TMethodKey, TMethodResponseHandlerWithInstance } from '../../types'

export interface IMethodFindOneOptions extends IMethodBaseOptions {
  template?: 'show'
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstance
}

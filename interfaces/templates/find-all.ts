import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions } from '../index'
import { IMethodQueryBuilderHandlerWithRequest, TMethodResponseHandlerWithInstances } from '../../types'

export interface IMethodFindAllOptions extends IMethodBaseOptions {
  template?: 'index'
  method?: 'findAndCountAll' | 'findAll'
  pagination?: boolean
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstances
}

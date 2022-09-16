import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions } from '../index'
import { IMethodQueryBuilderHandlerWithRequest, TMethodResponseHandlerWithCount } from '../../types'

export interface IMethodCountOptions extends IMethodBaseOptions {
  template?: 'count'
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithCount
}

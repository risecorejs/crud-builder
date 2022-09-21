import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index'
import { IMethodQueryBuilderHandlerWithContext, TMethodResponseHandlerWithContext } from '../../types'

export interface IMethodCountOptions extends IMethodBaseOptions {
  template?: 'count'
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodCountContextOptions, 'count'>>
  response?: TMethodResponseHandlerWithContext<Omit<IMethodCountContextOptions, 'count'> & { count: number }>
}

export interface IMethodCountContextOptions extends IMethodBaseContextOptions {
  count?: number
}

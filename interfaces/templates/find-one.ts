import { FindOptions } from 'sequelize'

import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index'
import { TMethodKey, IMethodQueryBuilderHandlerWithContext, TMethodResponseHandlerWithContext } from '../../types'

export interface IMethodFindOneOptions<M = any> extends IMethodBaseOptions {
  template?: 'show'
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodFindOneContextOptions<M>, 'instance'>>
  response?: TMethodResponseHandlerWithContext<Omit<IMethodFindOneContextOptions<M>, 'instance'> & { instance: M }>
}

export interface IMethodFindOneContextOptions<M = any> extends IMethodBaseContextOptions {
  instance?: null | M
}

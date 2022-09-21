import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index'
import {
  TMethodKey,
  IMethodQueryBuilderHandlerWithContext,
  TMethodResponseHandlerWithContext,
  CModel
} from '../../types'

export interface IMethodFindOneOptions extends IMethodBaseOptions {
  template?: 'show'
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodFindOneContextOptions, 'instance'>>
  response?: TMethodResponseHandlerWithContext<Omit<IMethodFindOneContextOptions, 'instance'> & { instance: CModel }>
}

export interface IMethodFindOneContextOptions extends IMethodBaseContextOptions {
  instance?: null | CModel
}

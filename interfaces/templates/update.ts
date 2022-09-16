import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions, IMethodContextOptions, IMethodContextOptionsWithoutInstance } from '../index'

import {
  CModel,
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodKey,
  TMethodOnly,
  TMethodResponseHandlerWithContext,
  TMethodRules,
  TMethodState
} from '../../types'

export interface IMethodUpdateOptions extends IMethodBaseOptions {
  template?: 'update'
  state?: TMethodState
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodContextOptions, 'fields' | 'instance'> & { instance: CModel }>
  only?: TMethodOnly<Omit<IMethodContextOptions, 'fields' | 'instance'> & { instance: CModel }>
  formatter?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  beforeUpdate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  afterUpdate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutInstance & { instance: CModel }>
}

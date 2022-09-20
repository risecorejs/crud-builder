import { FindOptions } from 'sequelize/types/model'

import { IFields, IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

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
  queryBuilder?:
    | FindOptions
    | IMethodQueryBuilderHandlerWithContext<Omit<IMethodUpdateContextOptions, 'fields' | 'instance'>>
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodUpdateContextOptions, 'fields' | 'instance'> & { instance: CModel }>
  only?: TMethodOnly<Omit<IMethodUpdateContextOptions, 'fields' | 'instance'> & { instance: CModel }>
  formatter?: TMethodHookHandler<Omit<IMethodUpdateContextOptions, 'instance'> & { instance: CModel }>
  beforeUpdate?: TMethodHookHandler<Omit<IMethodUpdateContextOptions, 'instance'> & { instance: CModel }>
  afterUpdate?: TMethodHookHandler<Omit<IMethodUpdateContextOptions, 'instance'> & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<Omit<IMethodUpdateContextOptions, 'instance'> & { instance: CModel }>
}

export interface IMethodUpdateContextOptions extends IMethodBaseContextOptions {
  fields?: null | IFields
  instance?: null | CModel
}

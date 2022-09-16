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
  formatter?: TMethodHookHandler<IMethodUpdateContextOptionsWithoutInstance & { instance: CModel }>
  beforeUpdate?: TMethodHookHandler<IMethodUpdateContextOptionsWithoutInstance & { instance: CModel }>
  afterUpdate?: TMethodHookHandler<IMethodUpdateContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodUpdateContextOptionsWithoutInstance & { instance: CModel }>
}

export interface IMethodUpdateContextOptions extends IMethodBaseContextOptions {
  fields?: null | IFields
  instance?: null | CModel
}

export interface IMethodUpdateContextOptionsWithoutInstance extends Omit<IMethodUpdateContextOptions, 'instance'> {}

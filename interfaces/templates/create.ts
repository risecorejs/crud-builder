import { IFields, IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

import {
  CModel,
  TMethodHookHandler,
  TMethodOnly,
  TMethodResponseHandlerWithContext,
  TMethodRules,
  TMethodState
} from '../../types'

export interface IMethodCreateOptions extends IMethodBaseOptions {
  template?: 'create'
  state?: TMethodState
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodCreateContextOptions, 'fields' | 'instance'>>
  only?: TMethodOnly<Omit<IMethodCreateContextOptions, 'fields' | 'instance'>>
  formatter?: TMethodHookHandler<Omit<IMethodCreateContextOptions, 'instance'>>
  beforeCreate?: TMethodHookHandler<Omit<IMethodCreateContextOptions, 'instance'>>
  afterCreate?: TMethodHookHandler<Omit<IMethodCreateContextOptions, 'instance'> & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<Omit<IMethodCreateContextOptions, 'instance'> & { instance: CModel }>
}

export interface IMethodCreateContextOptions extends IMethodBaseContextOptions {
  fields?: null | IFields
  instance?: null | CModel
}

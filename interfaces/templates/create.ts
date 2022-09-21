import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index'

import {
  TMethodState,
  TMethodRules,
  TMethodOnly,
  TMethodHookHandler,
  CModel,
  TMethodResponseHandlerWithContext
} from '../../types'

export interface IMethodCreateOptions extends IMethodBaseOptions {
  template?: 'create'
  state?: TMethodState<Omit<IMethodCreateContextOptions, 'state' | 'fields' | 'instance'>>
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
  state: IFields
  fields?: null | IFields
  instance?: null | CModel
}

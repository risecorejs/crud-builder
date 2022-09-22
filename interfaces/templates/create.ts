import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index'

import {
  TMethodState,
  TMethodRules,
  TMethodOnly,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext
} from '../../types'

export interface IMethodCreateOptions<M = any> extends IMethodBaseOptions {
  template?: 'create'
  state?: TMethodState<Omit<IMethodCreateContextOptions<M>, 'state' | 'fields' | 'instance'>>
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodCreateContextOptions<M>, 'fields' | 'instance'>>
  only?: TMethodOnly<Omit<IMethodCreateContextOptions<M>, 'fields' | 'instance'>>
  formatter?: TMethodHookHandler<Omit<IMethodCreateContextOptions<M>, 'instance'>>
  beforeCreate?: TMethodHookHandler<Omit<IMethodCreateContextOptions<M>, 'instance'>>
  afterCreate?: TMethodHookHandler<Omit<IMethodCreateContextOptions<M>, 'instance'> & { instance: M }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<Omit<IMethodCreateContextOptions<M>, 'instance'> & { instance: M }>
}

export interface IMethodCreateContextOptions<M = any> extends IMethodBaseContextOptions {
  state: IFields
  fields: null | IFields
  instance?: null | M
}

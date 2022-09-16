import { IMethodBaseOptions, IMethodContextOptions, IMethodContextOptionsWithoutInstance } from '../index'

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
  rules?: TMethodRules<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  only?: TMethodOnly<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  formatter?: TMethodHookHandler<IMethodContextOptionsWithoutInstance>
  beforeCreate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance>
  afterCreate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutInstance & { instance: CModel }>
}

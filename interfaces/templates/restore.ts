import { IFields, IMethodBaseOptions, IMethodContextOptionsWithoutFields } from '../index'

import {
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodKey,
  TMethodResponseHandlerWithContext,
  TMethodState
} from '../../types'

export interface IMethodRestoreOptions extends IMethodBaseOptions {
  template?: 'restore'
  state?: TMethodState
  key?: TMethodKey
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodContextOptionsWithoutFields>
  beforeRestore?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  afterRestore?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutFields>
}

import { IFields, IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

import {
  CModel,
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
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodRestoreContextOptionsWithoutInstance>
  beforeRestore?: TMethodHookHandler<IMethodRestoreContextOptionsWithoutInstance & { instance: CModel }>
  afterRestore?: TMethodHookHandler<IMethodRestoreContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodRestoreContextOptionsWithoutInstance & { instance: CModel }>
}

export interface IMethodRestoreContextOptions extends IMethodBaseContextOptions {
  instance?: null | CModel
}

export interface IMethodRestoreContextOptionsWithoutInstance extends Omit<IMethodRestoreContextOptions, 'instance'> {}

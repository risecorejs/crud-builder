import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index'

import {
  TMethodState,
  TMethodKey,
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext,
  CModel
} from '../../types'

export interface IMethodRestoreOptions extends IMethodBaseOptions {
  template?: 'restore'
  state?: TMethodState<Omit<IMethodRestoreContextOptions, 'state' | 'instance'>>
  key?: TMethodKey
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<Omit<IMethodRestoreContextOptions, 'instance'>>
  beforeRestore?: TMethodHookHandler<Omit<IMethodRestoreContextOptions, 'instance'> & { instance: CModel }>
  afterRestore?: TMethodHookHandler<Omit<IMethodRestoreContextOptions, 'instance'> & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<Omit<IMethodRestoreContextOptions, 'instance'> & { instance: CModel }>
}

export interface IMethodRestoreContextOptions extends IMethodBaseContextOptions {
  state: IFields
  instance?: null | CModel
}

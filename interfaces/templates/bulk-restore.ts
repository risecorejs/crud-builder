import { IFields, IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

import {
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext,
  TMethodState
} from '../../types'

export interface IMethodBulkRestoreOptions extends IMethodBaseOptions {
  template?: 'bulkRestore'
  state?: TMethodState
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodBulkRestoreContextOptions>
  beforeRestore?: TMethodHookHandler<IMethodBulkRestoreContextOptions>
  afterRestore?: TMethodHookHandler<IMethodBulkRestoreContextOptions>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodBulkRestoreContextOptions>
}

export interface IMethodBulkRestoreContextOptions extends IMethodBaseContextOptions {}

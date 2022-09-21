import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index'

import {
  TMethodState,
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext
} from '../../types'

export interface IMethodBulkRestoreOptions extends IMethodBaseOptions {
  template?: 'bulkRestore'
  state?: TMethodState<Omit<IMethodBulkRestoreContextOptions, 'state'>>
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodBulkRestoreContextOptions>
  beforeRestore?: TMethodHookHandler<IMethodBulkRestoreContextOptions>
  afterRestore?: TMethodHookHandler<IMethodBulkRestoreContextOptions>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodBulkRestoreContextOptions>
}

export interface IMethodBulkRestoreContextOptions extends IMethodBaseContextOptions {
  state: IFields
}

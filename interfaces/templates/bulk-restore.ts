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
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodBaseContextOptions>
  beforeRestore?: TMethodHookHandler<IMethodBaseContextOptions>
  afterRestore?: TMethodHookHandler<IMethodBaseContextOptions>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodBaseContextOptions>
}

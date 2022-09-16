import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

import {
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext,
  TMethodState
} from '../../types'

export interface IMethodBulkDestroyOptions extends IMethodBaseOptions {
  template?: 'bulkDestroy'
  state?: TMethodState
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<IMethodBulkDestroyContextOptionsWithoutCount>
  force?: boolean | ((ctx: IMethodBulkDestroyContextOptionsWithoutCount) => boolean | Promise<boolean>)
  beforeDestroy?: TMethodHookHandler<IMethodBulkDestroyContextOptionsWithoutCount>
  afterDestroy?: TMethodHookHandler<IMethodBulkDestroyContextOptionsWithoutCount & { count: number }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodBulkDestroyContextOptionsWithoutCount & { count: number }>
}

export interface IMethodBulkDestroyContextOptions extends IMethodBaseContextOptions {
  count?: number
}

export interface IMethodBulkDestroyContextOptionsWithoutCount extends Omit<IMethodBulkDestroyContextOptions, 'count'> {}

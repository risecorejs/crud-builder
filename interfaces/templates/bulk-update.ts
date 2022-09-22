import { FindOptions } from 'sequelize'

import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index'

import {
  TMethodState,
  IMethodQueryBuilderHandlerWithContext,
  TMethodRules,
  TMethodOnly,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext
} from '../../types'

export interface IMethodBulkUpdateOptions extends IMethodBaseOptions {
  template?: 'update'
  state?: TMethodState
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodBulkUpdateContextOptions, 'fields'>>
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodBulkUpdateContextOptions, 'fields'>>
  only?: TMethodOnly<Omit<IMethodBulkUpdateContextOptions, 'fields'>>
  formatter?: TMethodHookHandler<IMethodBulkUpdateContextOptions>
  beforeUpdate?: TMethodHookHandler<IMethodBulkUpdateContextOptions>
  afterUpdate?: TMethodHookHandler<IMethodBulkUpdateContextOptions>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodBulkUpdateContextOptions>
}

export interface IMethodBulkUpdateContextOptions extends IMethodBaseContextOptions {
  state: IFields
  fields: null | IFields
}

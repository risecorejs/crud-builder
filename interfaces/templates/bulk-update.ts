import { FindOptions } from 'sequelize/types/model'

import { IFields, IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

import {
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodOnly,
  TMethodResponseHandlerWithContext,
  TMethodRules,
  TMethodState
} from '../../types'

export interface IMethodBulkUpdateOptions extends IMethodBaseOptions {
  template?: 'update'
  state?: TMethodState
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<IMethodBulkUpdateContextOptionsWithoutFields>
  validator?: boolean
  rules?: TMethodRules<IMethodBulkUpdateContextOptionsWithoutFields>
  only?: TMethodOnly<IMethodBulkUpdateContextOptionsWithoutFields>
  formatter?: TMethodHookHandler<IMethodBulkUpdateContextOptions>
  beforeUpdate?: TMethodHookHandler<IMethodBulkUpdateContextOptions>
  afterUpdate?: TMethodHookHandler<IMethodBulkUpdateContextOptions>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodBulkUpdateContextOptions>
}

export interface IMethodBulkUpdateContextOptions extends IMethodBaseContextOptions {
  fields?: null | IFields
}

export interface IMethodBulkUpdateContextOptionsWithoutFields extends Omit<IMethodBulkUpdateContextOptions, 'fields'> {}

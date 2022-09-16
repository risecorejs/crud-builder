import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions, IMethodContextOptionsWithoutFields } from '../index'

import {
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodKey,
  TMethodResponseHandlerWithContext,
  TMethodState
} from '../../types'

export interface IMethodDestroyOptions extends IMethodBaseOptions {
  template?: 'destroy'
  state?: TMethodState
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<IMethodContextOptionsWithoutFields>
  force?: boolean | ((ctx: IMethodContextOptionsWithoutFields) => boolean | Promise<boolean>)
  beforeDestroy?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  afterDestroy?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutFields>
}

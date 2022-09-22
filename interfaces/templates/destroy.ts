import { FindOptions } from 'sequelize'

import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index'

import {
  TMethodState,
  TMethodKey,
  IMethodQueryBuilderHandlerWithContext,
  TMethodHookHandler,
  TMethodResponseHandlerWithContext
} from '../../types'

export interface IMethodDestroyOptions<M = any> extends IMethodBaseOptions {
  template?: 'destroy'
  state?: TMethodState<Omit<IMethodDestroyContextOptions<M>, 'state' | 'instance'>>
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodDestroyContextOptions<M>, 'instance'>>
  force?:
    | boolean
    | ((ctx: Omit<IMethodDestroyContextOptions<M>, 'instance'> & { instance: M }) => boolean | Promise<boolean>)
  beforeDestroy?: TMethodHookHandler<Omit<IMethodDestroyContextOptions<M>, 'instance'> & { instance: M }>
  afterDestroy?: TMethodHookHandler<Omit<IMethodDestroyContextOptions<M>, 'instance'> & { instance: M }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<Omit<IMethodDestroyContextOptions<M>, 'instance'> & { instance: M }>
}

export interface IMethodDestroyContextOptions<M = any> extends IMethodBaseContextOptions {
  state: IFields
  instance?: null | M
}

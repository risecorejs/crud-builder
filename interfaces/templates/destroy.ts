import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseContextOptions, IMethodBaseOptions } from '../index'

import {
  CModel,
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
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<IMethodDestroyContextOptionsWithoutInstance>
  force?:
    | boolean
    | ((ctx: IMethodDestroyContextOptionsWithoutInstance & { instance: CModel }) => boolean | Promise<boolean>)
  beforeDestroy?: TMethodHookHandler<IMethodDestroyContextOptionsWithoutInstance & { instance: CModel }>
  afterDestroy?: TMethodHookHandler<IMethodDestroyContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodDestroyContextOptionsWithoutInstance & { instance: CModel }>
}

export interface IMethodDestroyContextOptions extends IMethodBaseContextOptions {
  instance?: null | CModel
}

export interface IMethodDestroyContextOptionsWithoutInstance extends Omit<IMethodDestroyContextOptions, 'instance'> {}

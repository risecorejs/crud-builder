import express from 'express'
import { Model } from 'sequelize/types/model'
import { TKeys as TOnlyKeys } from '@risecorejs/only/types'
import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'
import { FindOptions } from 'sequelize/types/model'

import { IFields } from '../interfaces'

export class CModel extends Model {}

export type TTemplates =
  | 'create'
  | 'index'
  | 'show'
  | 'count'
  | 'update'
  | 'bulkUpdate'
  | 'destroy'
  | 'bulkDestroy'
  | 'restore'
  | 'bulkRestore'

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TTemplateHandler<T> = (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<T>
) => express.Handler

export type TMethodState<C = any> = object | ((ctx: C) => object | Promise<object>)
export type TMethodRules<C = any> = IValidatorRules | ((ctx: C) => IValidatorRules | Promise<IValidatorRules>)
export type TMethodOnly<C = any> = TOnlyKeys | ((ctx: C) => TOnlyKeys | Promise<TOnlyKeys>)
export type TMethodKey = 'id' | string | false

export type TMethodResponseHandlerWithContext<C = any> = (ctx: C) => IFields | Promise<IFields>

export type TMethodResponseHandlerWithInstance = (
  instance: CModel,
  req: express.Request,
  res: express.Response
) => IFields | Promise<IFields>

export type TMethodResponseHandlerWithInstances = (
  instances: { rows: CModel[]; count: number } | CModel[],
  req: express.Request,
  res: express.Response
) => IFields | Promise<IFields>

export type TMethodResponseHandlerWithCount = (
  count: number,
  req: express.Request,
  res: express.Response
) => IFields | Promise<IFields>

export type TMethodHookHandler<C = any> = (ctx: C) => void | Promise<void>

export type IMethodQueryBuilderHandlerWithRequest = (req: express.Request) => FindOptions | Promise<FindOptions>
export type IMethodQueryBuilderHandlerWithContext<C = any> = (ctx: C) => FindOptions | Promise<FindOptions>

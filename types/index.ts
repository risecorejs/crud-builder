import express from 'express'
import { Model } from 'sequelize'

import { TKeys as TOnlyKeys } from '@risecorejs/only/types'
import { FindOptions } from 'sequelize/types/model'

import { IFields, IMethodContextOptions } from '../interfaces'
import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'

export class CModel extends Model {}

export type TTemplates = 'create' | 'index' | 'show' | 'count' | 'update' | 'destroy' | 'restore'

// | 'bulkUpdate'
// | 'bulkDestroy'
// | 'bulkRestore'

export type TModel = string | typeof CModel | any

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TTemplateHandler<T> = (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<T>
) => express.Handler

export type TMethodState = object | ((req: express.Request) => object | Promise<object>)
export type TMethodRules<C = IMethodContextOptions> =
  | IValidatorRules
  | ((ctx: C) => IValidatorRules | Promise<IValidatorRules>)
export type TMethodOnly<C = IMethodContextOptions> = TOnlyKeys | ((ctx: C) => TOnlyKeys | Promise<TOnlyKeys>)
export type TMethodKey = 'id' | string | false

export type TMethodResponseHandlerWithContext<C = IMethodContextOptions> = (ctx: C) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstance = (instance: CModel, req: express.Request) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstances = (
  instances: { rows: CModel[]; count: number } | CModel[],
  req: express.Request
) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithCount = (count: number, req: express.Request) => IFields | Promise<IFields>

export type TMethodHookHandler<C = IMethodContextOptions> = (ctx: C) => void | Promise<void>

export type IMethodQueryBuilderHandlerWithRequest = (req: express.Request) => FindOptions
export type IMethodQueryBuilderHandlerWithContext<C = IMethodContextOptions> = (ctx: C) => FindOptions

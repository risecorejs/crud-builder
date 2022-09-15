import express from 'express'
import { Model } from 'sequelize'

import { TKeys as TOnlyKeys } from '@risecorejs/only/types'
import { FindOptions } from 'sequelize/types/model'

import { IFields, IMethodContextOptions } from '../interfaces'

export class CModel extends Model {}

export type TTemplates = 'create' | 'index' | 'show' | 'count' | 'update' | 'destroy' | 'restore'

// | 'bulkUpdate'
// | 'bulkDestroy'
// | 'bulkRestore'

export type TTemplateHandler<T> = (
  Model: typeof CModel,
  gettingOptionsInstruction: TGettingOptionsInstruction<T>
) => express.Handler

export type TMethodState = object | ((req: express.Request) => object | Promise<object>)
export type TMethodOnly<C = IMethodContextOptions> = TOnlyKeys | ((ctx: C) => TOnlyKeys | Promise<TOnlyKeys>)

export type TMethodResponseHandlerWithContext<T = IMethodContextOptions> = (ctx: T) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstance = (instance: CModel, req: express.Request) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstances = (
  instances: { rows: CModel[]; count: number } | CModel[],
  req: express.Request
) => IFields | Promise<IFields>

export type TMethodHookHandler<T = IMethodContextOptions> = (ctx: T) => void | Promise<void>
export type IMethodQueryBuilderHandlerWithContext<T = IMethodContextOptions> = (ctx: T) => FindOptions
export type IMethodQueryBuilderHandlerWithRequest = (req: express.Request) => FindOptions

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TModel = string | typeof CModel

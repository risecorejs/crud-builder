import express from 'express'

import { TKeys as TOnlyKeys } from '@risecorejs/only/types'

import { IFields, IMethodContextOptions } from '../interfaces'

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

export type TTemplateHandler<T> = (
  Model: object,
  gettingOptionsInstruction: TGettingOptionsInstruction<T>
) => express.Handler

export type TMethodWrapper<T> = true | (() => T)
export type TMethodState = object | ((req: express.Request) => object | Promise<object>)
export type TMethodOnly = TOnlyKeys | ((ctx: IMethodContextOptions) => TOnlyKeys | Promise<TOnlyKeys>)
export type TMethodResponseHandlerWithContext<T = IMethodContextOptions> = (ctx: T) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstance = (instance: object, req: express.Request) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstances = (
  instances: object[],
  req: express.Request
) => IFields | Promise<IFields>
export type TMethodHookHandler<T = IMethodContextOptions> = (ctx: T) => void | Promise<void>
export type IMethodQueryBuilderHandlerWithContext = (ctx: IMethodContextOptions) => object
export type IMethodQueryBuilderHandlerWithRequest = (req: express.Request) => object

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TModel = string | object

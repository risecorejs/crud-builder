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
export type TMethodState = IFields | ((req: express.Request) => IFields | Promise<IFields>)
export type TMethodOnly = TOnlyKeys | ((ctx: IMethodContextOptions) => TOnlyKeys | Promise<TOnlyKeys>)
export type TMethodResponseHandlerWithContext<T = IMethodContextOptions> = (ctx: T) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstance = (instance: IFields, req: express.Request) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstances = (
  instances: IFields[],
  req: express.Request
) => IFields | Promise<IFields>
export type TMethodHookHandler<T = IMethodContextOptions> = (ctx: T) => void | Promise<void>
export type IMethodQueryBuilderHandlerWithContext<T = IMethodContextOptions> = (ctx: T) => IFields
export type IMethodQueryBuilderHandlerWithRequest = (req: express.Request) => IFields

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TModel = string | object

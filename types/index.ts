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
export type TMethodResponseHandlerWithContext = (ctx: IMethodContextOptions) => IFields | Promise<IFields>
export type TMethodResponseHandlerWithInstance = (instance: object, req: express.Request) => IFields | Promise<IFields>
export type TMethodHookHandler = (ctx: IMethodContextOptions) => void | Promise<void>

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TModel = string | object

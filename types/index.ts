import express from 'express'

import { TKeys as TOnlyKeys } from '@risecorejs/only/types'

import { IMethodContext } from '../interfaces'

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

export type TMethodWrapper<T> = true | (() => T)

export type TMethodState = object | ((req: express.Request) => object | Promise<object>)

export type TMethodOnly = TOnlyKeys | ((ctx: IMethodContext) => TOnlyKeys | Promise<TOnlyKeys>)

export type TGettingOptionsInstruction<T = any> = true | (() => T)

export type TTemplateHandler<T> = (
  Model: object,
  gettingOptionsInstruction: TGettingOptionsInstruction<T>
) => express.Handler

export type TModel = string | object

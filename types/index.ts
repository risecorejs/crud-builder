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

export type TMethodWrapper<I> = true | (() => I)

export type TMethodState = object | ((req: express.Request) => object | Promise<object>)

export type TMethodOnly = TOnlyKeys | ((ctx: IMethodContext) => TOnlyKeys | Promise<TOnlyKeys>)

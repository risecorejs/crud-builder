import express from 'express'
import { TKeys as TOnlyKeys } from '@risecorejs/only/types'
import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'
import { FindOptions } from 'sequelize'

import { M } from '../classes'
import { IFields } from '../interfaces'

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
  Model: typeof M,
  gettingOptionsInstruction: TGettingOptionsInstruction<T>
) => express.Handler

export type TMethodKey = 'id' | string | false
export type TMethodState<C = any> = object | ((ctx: C) => object | Promise<object>)
export type TMethodRules<C = any> = IValidatorRules | ((ctx: C) => IValidatorRules | Promise<IValidatorRules>)
export type TMethodOnly<C = any> = TOnlyKeys | ((ctx: C) => TOnlyKeys | Promise<TOnlyKeys>)

export type IMethodQueryBuilderHandlerWithContext<C = any> = (ctx: C) => FindOptions | Promise<FindOptions>
export type TMethodHookHandler<C = any> = (ctx: C) => void | Promise<void>
export type TMethodResponseHandlerWithContext<C = any> = (ctx: C) => IFields | Promise<IFields>

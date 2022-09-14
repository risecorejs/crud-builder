import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'

import { TMethodWrapper, TTemplateHandler, TTemplates, TMethodState, TMethodOnly, TModel } from '../types'

export interface IFields<T = any> {
  [key: string]: T
}

export interface IMethods {
  [key: string]: TMethodWrapper<any>
}

export interface ITemplates {
  create: TTemplateHandler<IMethodCreateOptions>
  update: TTemplateHandler<IMethodUpdateOptions>
}

export interface IMethodCreateOptions extends IMethodBaseOptions, IMethodValidatorOptions, IMethodOnlyOptions {
  template?: 'create'
  state?: TMethodState
  formatter?: (ctx: IMethodContext) => void | Promise<void>
  beforeCreate?: (ctx: IMethodContext) => void | Promise<void>
  afterCreate?: (ctx: IMethodContext) => void | Promise<void>
  sendStatus?: boolean
  response?: (ctx: IMethodContext) => IFields | Promise<IFields>
}

export interface IMethodUpdateOptions
  extends IMethodBaseOptions,
    IMethodValidatorOptions,
    IMethodOnlyOptions,
    IMethodQueryBuilderOptions {
  template?: 'update'
  state?: TMethodState
  queryBuilder?: object | ((req: express.Request) => object)
  formatter?: (ctx: IMethodContext) => void | Promise<void>
  beforeUpdate?: (ctx: IMethodContext) => void | Promise<void>
  afterUpdate?: (ctx: IMethodContext) => void | Promise<void>
  sendStatus?: boolean
  response?: (ctx: IMethodContext) => IFields | Promise<IFields>
}

export interface IMethodContext {
  req: express.Request
  res: express.Response
  state: object
  fields: null | object
  instance: null | object
}

export interface IMethodBaseOptions {
  template?: TTemplates
  model?: TModel
}

export interface IMethodValidatorOptions {
  validator?: boolean
  rules?: IValidatorRules | ((ctx: IMethodContext) => IValidatorRules | Promise<IValidatorRules>)
}

export interface IMethodOnlyOptions {
  only?: TMethodOnly
}

export interface IMethodQueryBuilderOptions {
  key?: string | false
  queryBuilder?: IFields | ((ctxOrReq: IMethodContext | express.Request) => IFields)
}

export interface IEndpoints {
  [key: string]: express.Handler
}

export interface IErrorResponse {
  status: number
  message: string
  errors?: any
}

import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'

import { TTemplates, TMethodWrapper, TMethodState, TMethodOnly } from '../types'

export interface IFields {
  [key: string]: any
}

export interface IMethods {
  create?: TMethodWrapper<IMethodCreateOptions>

  index?: true
  show?: true
  count?: true

  update?: TMethodWrapper<IMethodUpdateOptions>

  bulkUpdate?: true
  destroy?: true
  bulkDestroy?: true
  restore?: true
  bulkRestore?: true

  [key: string]: any
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
  model?: string | object
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
  queryBuilder?: object | ((ctxOrReq: IMethodContext | express.Request) => object)
}

export interface IEndpoints {
  [key: string]: express.Handler
}

export interface IErrorResponse {
  status: number
  message: string
  errors?: any
}

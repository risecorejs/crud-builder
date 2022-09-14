import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'

import {
  TMethodWrapper,
  TTemplates,
  TMethodState,
  TMethodOnly,
  TModel,
  TMethodResponseHandlerWithContext,
  TMethodResponseHandlerWithInstance,
  TMethodHookHandler,
  TMethodResponseHandlerWithInstances
} from '../types'

export interface IFields<T = any> {
  [key: string]: T
}

export interface IMethods {
  [key: string]: TMethodWrapper<any>
}

// CREATE-OPTIONS
export interface IMethodCreateOptions extends IMethodBaseOptions, IMethodValidatorOptions, IMethodOnlyOptions {
  template?: 'create'
  state?: TMethodState
  formatter?: TMethodHookHandler
  beforeCreate?: TMethodHookHandler
  afterCreate?: TMethodHookHandler
  response?: TMethodResponseHandlerWithContext
}

// UPDATE-OPTIONS
export interface IMethodUpdateOptions
  extends IMethodBaseOptions,
    IMethodValidatorOptions,
    IMethodOnlyOptions,
    IMethodQueryBuilderOptions {
  template?: 'update'
  state?: TMethodState
  queryBuilder?: object | ((ctx: IMethodContextOptions) => object)
  formatter?: TMethodHookHandler
  beforeUpdate?: TMethodHookHandler
  afterUpdate?: TMethodHookHandler
  response?: TMethodResponseHandlerWithContext
}

// FIND-ONE-OPTIONS
export interface IMethodFindOneOptions extends IMethodBaseOptions, IMethodQueryBuilderOptions {
  template?: 'show'
  key?: string | false
  queryBuilder?: object | ((req: express.Request) => object)
  response?: TMethodResponseHandlerWithInstance
}

// FIND-All-OPTIONS
export interface IMethodFindAllOptions extends IMethodBaseOptions, IMethodQueryBuilderOptions {
  template?: 'index'
  key?: string | false
  queryBuilder?: object | ((req: express.Request) => object)
  response?: TMethodResponseHandlerWithInstances
  method?: 'findAndCountAll' | 'findAll'
  pagination?: boolean
}

// CONTEXT-OPTIONS
export interface IMethodContextOptions {
  req: express.Request
  res: express.Response
  state: object
  fields: null | object
  instance: null | object
}

// BASE-OPTIONS
export interface IMethodBaseOptions {
  template?: TTemplates
  model?: TModel
  sendStatus?: boolean
  response?:
    | TMethodResponseHandlerWithContext
    | TMethodResponseHandlerWithInstance
    | TMethodResponseHandlerWithInstances
}

export interface IMethodValidatorOptions {
  validator?: boolean
  rules?: IValidatorRules | ((ctx: IMethodContextOptions) => IValidatorRules | Promise<IValidatorRules>)
}

export interface IMethodOnlyOptions {
  only?: TMethodOnly
}

export interface IMethodQueryBuilderOptions {
  key?: string | false
  queryBuilder?: IFields | ((ctxOrReq: IMethodContextOptions | express.Request) => IFields)
}

export interface IEndpoints {
  [key: string]: express.Handler
}

export interface IErrorResponse {
  status: number
  message: string
  errors?: any
}

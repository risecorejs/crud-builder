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
  TMethodResponseHandlerWithInstances,
  IMethodQueryBuilderHandlerWithContext,
  IMethodQueryBuilderHandlerWithRequest
} from '../types'

// FIELDS
export interface IFields<T = any> {
  [key: string]: T
}

// METHODS
export interface IMethods {
  [key: string]: TMethodWrapper<any>
}

// ENDPOINTS
export interface IEndpoints {
  [key: string]: express.Handler
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
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext
  formatter?: TMethodHookHandler
  beforeUpdate?: TMethodHookHandler
  afterUpdate?: TMethodHookHandler
  response?: TMethodResponseHandlerWithContext
}

// FIND-ONE-OPTIONS
export interface IMethodFindOneOptions extends IMethodBaseOptions, IMethodQueryBuilderOptions {
  template?: 'show'
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstance
}

// FIND-All-OPTIONS
export interface IMethodFindAllOptions extends IMethodBaseOptions, Omit<IMethodQueryBuilderOptions, 'key'> {
  template?: 'index'
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstances
  method?: 'findAndCountAll' | 'findAll'
  pagination?: boolean
}

// COUNT-OPTIONS
export interface IMethodCountOptions
  extends Omit<IMethodBaseOptions, 'sendStatus' | 'response'>,
    Omit<IMethodQueryBuilderOptions, 'key'> {
  template?: 'count'
}

// DESTROY-OPTIONS
export interface IMethodDestroyOptions extends IMethodBaseOptions, IMethodQueryBuilderOptions {
  template?: 'destroy'
  state?: TMethodState
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodContextOptionsWithoutFields>
  force?: boolean | ((ctx: IMethodContextOptionsWithoutFields) => boolean | Promise<boolean>)
  beforeDestroy?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  afterDestroy?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutFields>
}

// RESTORE-OPTIONS
export interface IMethodRestoreOptions extends IMethodBaseOptions, IMethodQueryBuilderOptions {
  template?: 'restore'
  state?: TMethodState
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodContextOptionsWithoutFields>
  beforeRestore?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  afterRestore?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutFields>
}

// CONTEXT-OPTIONS
export interface IMethodContextOptions {
  req: express.Request
  res: express.Response
  state: IFields
  fields: null | IFields
  instance: null | IFields
}

// CONTEXT-OPTIONS-WITHOUT-FIELDS
export interface IMethodContextOptionsWithoutFields extends Omit<IMethodContextOptions, 'fields'> {}

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

// VALIDATOR-OPTIONS
export interface IMethodValidatorOptions {
  validator?: boolean
  rules?: IValidatorRules | ((ctx: IMethodContextOptions) => IValidatorRules | Promise<IValidatorRules>)
}

// ONLY-OPTIONS
export interface IMethodOnlyOptions {
  only?: TMethodOnly
}

// QUERY-BUILDER-OPTIONS
export interface IMethodQueryBuilderOptions {
  key?: string | false
  queryBuilder?:
    | IFields
    | ((ctxOrReq: IMethodContextOptions | IMethodContextOptionsWithoutFields | express.Request) => IFields)
}

// ERROR-RESPONSE
export interface IMethodErrorResponse {
  status: number
  message: string
  errors?: any
}

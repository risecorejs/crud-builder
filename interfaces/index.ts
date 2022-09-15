import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'
import { FindOptions } from 'sequelize/types/model'

import {
  TTemplates,
  TMethodState,
  TMethodOnly,
  TModel,
  TMethodResponseHandlerWithContext,
  TMethodResponseHandlerWithInstance,
  TMethodHookHandler,
  TMethodResponseHandlerWithInstances,
  IMethodQueryBuilderHandlerWithContext,
  IMethodQueryBuilderHandlerWithRequest,
  TGettingOptionsInstruction,
  TTemplateHandler,
  CModel,
  TMethodResponseHandlerWithCount
} from '../types'

// FIELDS
export interface IFields<T = any> {
  [key: string]: T
}

// TEMPLATES
export interface ITemplates {
  create: TTemplateHandler<IMethodCreateOptions>
  index: TTemplateHandler<IMethodFindAllOptions>
  show: TTemplateHandler<IMethodFindOneOptions>
  count: TTemplateHandler<IMethodCountOptions>
  update: TTemplateHandler<IMethodUpdateOptions>
  destroy: TTemplateHandler<IMethodDestroyOptions>
  restore: TTemplateHandler<IMethodRestoreOptions>
}

// METHODS
export interface IMethods {
  create?: TGettingOptionsInstruction<IMethodCreateOptions>
  index?: TGettingOptionsInstruction<IMethodFindAllOptions>
  show?: TGettingOptionsInstruction<IMethodFindOneOptions>
  count?: TGettingOptionsInstruction<IMethodCountOptions>
  update?: TGettingOptionsInstruction<IMethodUpdateOptions>
  destroy?: TGettingOptionsInstruction<IMethodDestroyOptions>
  restore?: TGettingOptionsInstruction<IMethodRestoreOptions>

  [key: string]: any
}

// ENDPOINTS
export interface IEndpoints {
  [key: string]: express.Handler
}

// CREATE-OPTIONS
export interface IMethodCreateOptions
  extends IMethodBaseOptions,
    IMethodValidatorOptions<Omit<IMethodContextOptions, 'fields' | 'instance'>>,
    IMethodOnlyOptions<Omit<IMethodContextOptions, 'fields' | 'instance'>> {
  template?: 'create'
  state?: TMethodState
  formatter?: TMethodHookHandler<IMethodContextOptionsWithoutInstance>
  beforeCreate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance>
  afterCreate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutInstance & { instance: CModel }>
}

// FIND-All-OPTIONS
export interface IMethodFindAllOptions
  extends Omit<IMethodBaseOptions, 'sendStatus'>,
    Omit<IMethodQueryBuilderOptions, 'key'> {
  template?: 'index'
  method?: 'findAndCountAll' | 'findAll'
  pagination?: boolean
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstances
}

// FIND-ONE-OPTIONS
export interface IMethodFindOneOptions extends Omit<IMethodBaseOptions, 'sendStatus'>, IMethodQueryBuilderOptions {
  template?: 'show'
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstance
}

// COUNT-OPTIONS
export interface IMethodCountOptions
  extends Omit<IMethodBaseOptions, 'sendStatus'>,
    Omit<IMethodQueryBuilderOptions, 'key'> {
  template?: 'count'
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithCount
}

// UPDATE-OPTIONS
export interface IMethodUpdateOptions
  extends IMethodBaseOptions,
    IMethodQueryBuilderOptions,
    IMethodValidatorOptions<IMethodContextOptionsWithoutInstance & { instance: CModel }>,
    IMethodOnlyOptions {
  template?: 'update'
  state?: TMethodState
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  formatter?: TMethodHookHandler
  beforeUpdate?: TMethodHookHandler
  afterUpdate?: TMethodHookHandler
  response?: TMethodResponseHandlerWithContext
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
  instance: null | CModel
}

// CONTEXT-OPTIONS-WITHOUT-FIELDS
export interface IMethodContextOptionsWithoutFields extends Omit<IMethodContextOptions, 'fields'> {}

// CONTEXT-OPTIONS-WITHOUT-INSTANCE
export interface IMethodContextOptionsWithoutInstance extends Omit<IMethodContextOptions, 'instance'> {}

// BASE-OPTIONS
export interface IMethodBaseOptions {
  template?: TTemplates
  model?: TModel
  sendStatus?: boolean
  response?:
    | TMethodResponseHandlerWithContext
    | TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutInstance & { instance: CModel }>
    | TMethodResponseHandlerWithInstance
    | TMethodResponseHandlerWithInstances
    | TMethodResponseHandlerWithCount
}

// VALIDATOR-OPTIONS
export interface IMethodValidatorOptions<C = IMethodContextOptions> {
  validator?: boolean
  rules?: IValidatorRules | ((ctx: C) => IValidatorRules | Promise<IValidatorRules>)
}

// ONLY-OPTIONS
export interface IMethodOnlyOptions<C = IMethodContextOptions> {
  only?: TMethodOnly<C>
}

// QUERY-BUILDER-OPTIONS
export interface IMethodQueryBuilderOptions {
  key?: 'id' | string | false
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

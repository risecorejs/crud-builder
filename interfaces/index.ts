import express from 'express'

import { FindOptions } from 'sequelize/types/model'

import {
  TTemplates,
  TModel,
  TMethodState,
  TMethodOnly,
  TMethodResponseHandlerWithContext,
  TMethodResponseHandlerWithInstance,
  TMethodHookHandler,
  TMethodResponseHandlerWithInstances,
  IMethodQueryBuilderHandlerWithContext,
  IMethodQueryBuilderHandlerWithRequest,
  TGettingOptionsInstruction,
  TTemplateHandler,
  CModel,
  TMethodResponseHandlerWithCount,
  TMethodRules,
  TMethodKey
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

// BASE-OPTIONS
export interface IMethodBaseOptions {
  template?: TTemplates
  model?: TModel
}

// CREATE-OPTIONS
export interface IMethodCreateOptions extends IMethodBaseOptions {
  template?: 'create'
  state?: TMethodState
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  only?: TMethodOnly<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  formatter?: TMethodHookHandler<IMethodContextOptionsWithoutInstance>
  beforeCreate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance>
  afterCreate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutInstance & { instance: CModel }>
}

// FIND-All-OPTIONS
export interface IMethodFindAllOptions extends IMethodBaseOptions {
  template?: 'index'
  method?: 'findAndCountAll' | 'findAll'
  pagination?: boolean
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstances
}

// FIND-ONE-OPTIONS
export interface IMethodFindOneOptions extends IMethodBaseOptions {
  template?: 'show'
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithInstance
}

// COUNT-OPTIONS
export interface IMethodCountOptions extends IMethodBaseOptions {
  template?: 'count'
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithRequest
  response?: TMethodResponseHandlerWithCount
}

// UPDATE-OPTIONS
export interface IMethodUpdateOptions extends IMethodBaseOptions {
  template?: 'update'
  state?: TMethodState
  key?: TMethodKey
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodContextOptions, 'fields' | 'instance'>>
  validator?: boolean
  rules?: TMethodRules<Omit<IMethodContextOptions, 'fields' | 'instance'> & { instance: CModel }>
  only?: TMethodOnly<Omit<IMethodContextOptions, 'fields' | 'instance'> & { instance: CModel }>
  formatter?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  beforeUpdate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  afterUpdate?: TMethodHookHandler<IMethodContextOptionsWithoutInstance & { instance: CModel }>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutInstance & { instance: CModel }>
}

// DESTROY-OPTIONS
export interface IMethodDestroyOptions extends IMethodBaseOptions {
  template?: 'destroy'
  state?: TMethodState
  key?: TMethodKey
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodContextOptionsWithoutFields>
  force?: boolean | ((ctx: IMethodContextOptionsWithoutFields) => boolean | Promise<boolean>)
  beforeDestroy?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  afterDestroy?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  sendStatus?: boolean
  response?: TMethodResponseHandlerWithContext<IMethodContextOptionsWithoutFields>
}

// RESTORE-OPTIONS
export interface IMethodRestoreOptions extends IMethodBaseOptions {
  template?: 'restore'
  state?: TMethodState
  key?: TMethodKey
  queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<IMethodContextOptionsWithoutFields>
  beforeRestore?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  afterRestore?: TMethodHookHandler<IMethodContextOptionsWithoutFields>
  sendStatus?: boolean
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

// ERROR-RESPONSE
export interface IMethodErrorResponse {
  status: number
  message: string
  errors?: any
}

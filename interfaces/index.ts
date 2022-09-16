import express from 'express'

import { TTemplates, TModel, TGettingOptionsInstruction, TTemplateHandler, CModel } from '../types'

import { IMethodRestoreOptions } from './templates/restore'
import { IMethodCountOptions } from './templates/count'
import { IMethodDestroyOptions } from './templates/destroy'
import { IMethodUpdateOptions } from './templates/update'
import { IMethodCreateOptions } from './templates/create'
import { IMethodFindAllOptions } from './templates/find-all'
import { IMethodFindOneOptions } from './templates/find-one'

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

// BASE-CONTEXT-OPTIONS
export interface IMethodBaseContextOptions {
  req: express.Request
  res: express.Response
  state: object
}

// CONTEXT-OPTIONS
export interface IMethodContextOptions extends IMethodBaseContextOptions {
  fields?: null | IFields
  instance?: null | CModel
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

export * from './templates/create'

export * from './templates/find-all'
export * from './templates/find-one'
export * from './templates/count'

export * from './templates/update'

export * from './templates/destroy'
export * from './templates/bulk-destroy'

export * from './templates/restore'
export * from './templates/bulk-restore'

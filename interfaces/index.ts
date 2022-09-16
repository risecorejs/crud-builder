import express from 'express'

import { TTemplates, TModel, TGettingOptionsInstruction, TTemplateHandler } from '../types'

import { IMethodCreateOptions } from './templates/create'

import { IMethodFindAllOptions } from './templates/find-all'
import { IMethodFindOneOptions } from './templates/find-one'
import { IMethodCountOptions } from './templates/count'

import { IMethodUpdateOptions } from './templates/update'

import { IMethodDestroyOptions } from './templates/destroy'
import { IMethodBulkDestroyOptions } from './templates/bulk-destroy'

import { IMethodRestoreOptions } from './templates/restore'
import { IMethodBulkRestoreOptions } from './templates/bulk-restore'

export * from './templates/create'

export * from './templates/find-all'
export * from './templates/find-one'
export * from './templates/count'

export * from './templates/update'

export * from './templates/destroy'
export * from './templates/bulk-destroy'

export * from './templates/restore'
export * from './templates/bulk-restore'

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
  bulkDestroy: TTemplateHandler<IMethodBulkDestroyOptions>

  restore: TTemplateHandler<IMethodRestoreOptions>
  bulkRestore: TTemplateHandler<IMethodBulkRestoreOptions>
}

// METHODS
export interface IMethods {
  create?: TGettingOptionsInstruction<IMethodCreateOptions>

  index?: TGettingOptionsInstruction<IMethodFindAllOptions>
  show?: TGettingOptionsInstruction<IMethodFindOneOptions>
  count?: TGettingOptionsInstruction<IMethodCountOptions>

  update?: TGettingOptionsInstruction<IMethodUpdateOptions>

  destroy?: TGettingOptionsInstruction<IMethodDestroyOptions>
  bulkDestroy?: TGettingOptionsInstruction<IMethodBulkDestroyOptions>

  restore?: TGettingOptionsInstruction<IMethodRestoreOptions>
  bulkRestore?: TGettingOptionsInstruction<IMethodBulkRestoreOptions>

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

// ERROR-RESPONSE
export interface IMethodErrorResponse {
  status: number
  message: string
  errors?: any
}

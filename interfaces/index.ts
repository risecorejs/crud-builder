import express from 'express'

import { TTemplateHandler, TGettingOptionsInstruction, TTemplates } from '../types'

export * from './templates/create'
import { IMethodCreateOptions } from './templates/create'

export * from './templates/find-all'
import { IMethodFindAllOptions } from './templates/find-all'

export * from './templates/find-one'
import { IMethodFindOneOptions } from './templates/find-one'

export * from './templates/count'
import { IMethodCountOptions } from './templates/count'

export * from './templates/update'
import { IMethodUpdateOptions } from './templates/update'

export * from './templates/bulk-update'
import { IMethodBulkUpdateOptions } from './templates/bulk-update'

export * from './templates/destroy'
import { IMethodDestroyOptions } from './templates/destroy'

export * from './templates/bulk-destroy'
import { IMethodBulkDestroyOptions } from './templates/bulk-destroy'

export * from './templates/restore'
import { IMethodRestoreOptions } from './templates/restore'

export * from './templates/bulk-restore'
import { IMethodBulkRestoreOptions } from './templates/bulk-restore'

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
  bulkUpdate: TTemplateHandler<IMethodBulkUpdateOptions>

  destroy: TTemplateHandler<IMethodDestroyOptions>
  bulkDestroy: TTemplateHandler<IMethodBulkDestroyOptions>

  restore: TTemplateHandler<IMethodRestoreOptions>
  bulkRestore: TTemplateHandler<IMethodBulkRestoreOptions>
}

// METHODS
export interface IMethods<M = any> {
  create?: TGettingOptionsInstruction<IMethodCreateOptions<M>>

  index?: TGettingOptionsInstruction<IMethodFindAllOptions<M>>
  show?: TGettingOptionsInstruction<IMethodFindOneOptions<M>>
  count?: TGettingOptionsInstruction<IMethodCountOptions>

  update?: TGettingOptionsInstruction<IMethodUpdateOptions<M>>
  bulkUpdate?: TGettingOptionsInstruction<IMethodBulkUpdateOptions>

  destroy?: TGettingOptionsInstruction<IMethodDestroyOptions<M>>
  bulkDestroy?: TGettingOptionsInstruction<IMethodBulkDestroyOptions>

  restore?: TGettingOptionsInstruction<IMethodRestoreOptions<M>>
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
  model?: any
}

// BASE-CONTEXT-OPTIONS
export interface IMethodBaseContextOptions {
  req: express.Request
  res: express.Response
}

// ERROR-RESPONSE
export interface IMethodErrorResponse {
  status: number
  message: string
  errors?: any
}

import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'
import { TKeys as TOnlyKeys } from '@risecorejs/only/types'

import { TTemplates, TMethodWrapper, TMethodState, TMethodOnly } from '../types'

export interface IOptions {
  model: string | object
  methods: IMethods
}

export interface IMethods {
  create?: TMethodWrapper<IMethodCreateOptions>

  index?: true
  show?: true
  count?: true
  update?: true
  bulkUpdate?: true
  destroy?: true
  bulkDestroy?: true
  restore?: true
  bulkRestore?: true

  [key: string]: any
}

export interface IMethodCreateOptions extends IMethodBaseOptions, IMethodValidatorOptions, IMethodOnly {
  template?: 'create'
  state?: TMethodState
  formatter?: (ctx: IMethodContext) => void | Promise<void>
  beforeCreate?: (ctx: IMethodContext) => void | Promise<void>
  afterCreate?: (ctx: IMethodContext) => void | Promise<void>
  sendStatus?: boolean
  response?: (ctx: IMethodContext) => any | Promise<any>
}

export interface IMethodContext {
  req: express.Request
  res: express.Response
  state: object
  fields: object
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

export interface IMethodOnly {
  only?: TMethodOnly
}

export interface IEndpoints {
  [key: string]: (req: express.Request, res: express.Response) => any
}

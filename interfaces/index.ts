import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'
import { TKeys as TOnlyKeys } from '@risecorejs/only/types'

import { TTemplates } from '../types'

export interface IOptions {
  model: string | object
  methods: IMethods
}

export interface IMethods {
  create?: true | ICreateMethodOptions

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

export interface ICreateMethodOptions extends IBaseMethodOptions {
  template?: 'create'
  state?: object | ((req: express.Request) => object)
  validator?: boolean
  rules?: IValidatorRules
  only?: TOnlyKeys
  formatter?: (ctx: ICreateMethodContext) => void
  beforeCreate?: (ctx: ICreateMethodContext) => void
  afterCreate?: (ctx: ICreateMethodContext) => void
  sendStatus?: boolean
  response?: (ctx: ICreateMethodContext) => void
}

export interface ICreateMethodContext {
  req: express.Request
  res: express.Response
  state: object
  fields: null | object
  instance: object
}

export interface IBaseMethodOptions {
  template?: TTemplates
  model?: string | object
}

export interface IEndpoints {
  [key: string]: (req: express.Request, res: express.Response) => any
}

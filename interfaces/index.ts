import express from 'express'

import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces'
import { TKeys as TOnlyKeys } from '@risecorejs/only/types'

import { TTemplates } from '../types'

export interface IOptions {
  model: string | object
  methods: IMethods
}

export interface IMethods {
  create?: true | ICreateMethodOptions // ...

  index: true | IBaseMethodOptions
  show: true | IBaseMethodOptions
  count: true | IBaseMethodOptions
  update: true | IBaseMethodOptions
  bulkUpdate: true | IBaseMethodOptions
  destroy: true | IBaseMethodOptions
  bulkDestroy: true | IBaseMethodOptions
  restore: true | IBaseMethodOptions
  bulkRestore: true | IBaseMethodOptions
}

export interface ICreateMethodOptions extends IBaseMethodOptions {
  template?: 'create'
  state?: object | ((req?: express.Request) => object)
  validator?: boolean
  rules?: IValidatorRules
  only?: TOnlyKeys
  formatter?: (ctx: ICreateContext) => void
}

export interface ICreateContext {
  req: express.Request
  state: object
  fields: null | object
  instance: object
}

export interface IBaseMethodOptions {
  template?: TTemplates
  model?: string | object
}

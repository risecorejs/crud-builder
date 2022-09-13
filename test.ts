import only from '@risecorejs/only'
import crudBuilder from './index'

import { IMethodCreateOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  create
})

function create(): IMethodCreateOptions {
  return {
    template: 'create'
  }
}

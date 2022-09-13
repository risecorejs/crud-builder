import only from '@risecorejs/only'
import crudBuilder from './index'

import { IMethodUpdateOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  update
})

function update(): IMethodUpdateOptions {
  return {
    template: 'update',
    queryBuilder: (req) => ({})
  }
}

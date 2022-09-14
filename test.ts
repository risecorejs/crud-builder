import crudBuilder from './index'

import { IMethodUpdateOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  update
})

function update(): IMethodUpdateOptions {
  return {
    template: 'update',
    response(ctx) {
      ctx.instance.asdas

      return {}
    }
  }
}

console.log(endpoints)

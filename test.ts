import crudBuilder from './index'

import { IMethodCreateOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  create
})

function create(): IMethodCreateOptions {
  return {
    template: 'create',
    model: 'Customer',
    state(req) {
      return {}
    },
    validator: true,
    rules(ctx) {
      return {}
    },
    only(ctx) {
      return ['asd']
    },
    formatter(ctx) {},
    beforeCreate(ctx) {},
    afterCreate(ctx) {}
  }
}

console.log(endpoints)

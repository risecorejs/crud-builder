import crudBuilder from './index'

import { IMethodCreateOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  create: () => ({
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
    afterCreate(ctx) {},
    sendStatus: true,
    response(ctx) {
      return {
        test: 123
      }
    }
  })
})

console.log(endpoints)

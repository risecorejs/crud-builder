import crudBuilder from './index'

import { IMethodCreateOptions, IMethodFindAllOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  // CREATE
  create: (): IMethodCreateOptions => ({
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
  }),

  // INDEX
  index: (): IMethodFindAllOptions => ({
    template: 'index',
    model: 'Customer',
    method: 'findAndCountAll',
    pagination: true,
    queryBuilder: (req) => ({}),
    response: (instances, req) => {
      if (Array.isArray(instances)) {
      }

      return {
        instances
      }
    }
  })
})

console.log(endpoints)

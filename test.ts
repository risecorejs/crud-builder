import crudBuilder from './index'

import { IMethodCreateOptions, IMethodFindAllOptions, IMethodFindOneOptions } from './interfaces'

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
      ctx.instance.update({})

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
      } else {
      }

      return { instances }
    }
  }),

  // SHOW
  show: (): IMethodFindOneOptions => ({
    template: 'show',
    model: 'Customer',
    key: 'customerId',
    queryBuilder: (req) => ({}),
    response: (instance, req) => {
      instance.update({})

      return { instance }
    }
  }),

  // COUNT
  count: () => ({
    template: 'count',
    model: 'Customer',
    queryBuilder: (req) => ({}),
    response: async (count, req) => {
      return { count }
    }
  })
})

console.log(endpoints)

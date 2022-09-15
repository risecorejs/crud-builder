import crudBuilder from './index'

import { IMethodCreateOptions, IMethodFindAllOptions, IMethodFindOneOptions, IMethodUpdateOptions } from './interfaces'

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
      return []
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
  }),

  // UPDATE
  update: (): IMethodUpdateOptions => ({
    template: 'update',
    model: 'Customer',
    state(req) {
      return {}
    },
    queryBuilder: (ctx) => {
      // ctx.

      return {}
    },
    validator: true,
    rules(ctx) {
      ctx.instance

      return {}
    },
    only(ctx) {
      return []
    },
    formatter(ctx) {},
    beforeUpdate(ctx) {},
    afterUpdate(ctx) {},
    sendStatus: true,
    response(ctx) {
      return {
        test: 123
      }
    }
  })
})

console.log(endpoints)

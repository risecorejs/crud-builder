import crudBuilder from './index'

import { IMethodCreateOptions, IMethodFindAllOptions, IMethodFindOneOptions, IMethodUpdateOptions } from './interfaces'

const endpoints = crudBuilder('User', {
  // CREATE
  create: (): IMethodCreateOptions => ({
    template: 'create',
    model: 'Customer',
    state: (req) => {
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
      return {}
    }
  }),

  // INDEX
  index: (): IMethodFindAllOptions => ({
    template: 'index',
    model: 'Customer',
    method: 'findAndCountAll',
    pagination: true,
    queryBuilder(req) {
      return {}
    },
    response(instances, req) {
      return {}
    }
  }),

  // SHOW
  show: (): IMethodFindOneOptions => ({
    template: 'show',
    model: 'Customer',
    key: 'customerId',
    queryBuilder(req) {
      return {}
    },
    response(instance, req) {
      return {}
    }
  }),

  // COUNT
  count: () => ({
    template: 'count',
    model: 'Customer',
    queryBuilder(req) {
      return {}
    },
    async response(count, req) {
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
    queryBuilder(ctx) {
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
    beforeUpdate(ctx) {},
    afterUpdate(ctx) {},
    sendStatus: true,
    response(ctx) {
      return {}
    }
  })
})

console.log(endpoints)

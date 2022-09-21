import crudBuilder from './index'

import {
  IMethodCreateOptions,
  IMethodFindAllOptions,
  IMethodFindOneOptions,
  IMethodCountOptions,
  IMethodUpdateOptions,
  IMethodDestroyOptions,
  IMethodRestoreOptions,
  IMethodBulkDestroyOptions,
  IFields
} from './interfaces'

export = crudBuilder('User', {
  // CREATE
  create: (): IMethodCreateOptions => ({
    template: 'create',
    model: 'Customer',
    state: async (ctx) => {
      ctx.req
      ctx.res

      return {}
    },
    validator: true,
    rules: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return {
        name: 'required',
        email: 'required'
      }
    },
    only: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return ['name', 'email']
    },
    formatter: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.fields
    },
    beforeCreate: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.fields
    },
    afterCreate: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.fields
      ctx.instance
    },
    sendStatus: true,
    response: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.fields
      ctx.instance

      return {}
    }
  }),

  // INDEX
  index: (): IMethodFindAllOptions => ({
    template: 'index',
    model: 'Customer',
    method: 'findAndCountAll',
    pagination: true,
    queryBuilder(ctx) {
      ctx.req
      ctx.res

      return {}
    },
    response(ctx) {
      ctx.req
      ctx.res
      ctx.instances

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
  count: (): IMethodCountOptions => ({
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
    key: 'customerId',
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
  }),

  // DESTROY
  destroy: (): IMethodDestroyOptions => ({
    template: 'destroy',
    model: 'Customer',
    state(req) {
      return {}
    },
    key: 'customerId',
    queryBuilder(ctx) {
      return {}
    },
    force(ctx) {
      return true
    },
    beforeDestroy(ctx) {},
    afterDestroy(ctx) {},
    sendStatus: true,
    response(ctx) {
      return {}
    }
  }),

  // BULK-DESTROY
  bulkDestroy: (): IMethodBulkDestroyOptions => ({
    template: 'bulkDestroy',
    model: 'Customer',
    state(req) {
      return {}
    },
    queryBuilder(ctx) {
      return {}
    },
    force(ctx) {
      return true
    },
    beforeDestroy(ctx) {},
    afterDestroy(ctx) {},
    sendStatus: true,
    response(ctx) {
      return {}
    }
  }),

  // RESTORE
  restore: (): IMethodRestoreOptions => ({
    template: 'restore',
    model: 'Customer',
    state(req) {
      return {}
    },
    key: 'customerId',
    queryBuilder(ctx) {
      return {}
    },
    beforeRestore(ctx) {},
    afterRestore(ctx) {},
    sendStatus: true,
    response(ctx) {
      return {}
    }
  })
})

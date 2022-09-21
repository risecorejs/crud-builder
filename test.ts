import crudBuilder from './index'

import {
  IMethodCreateOptions,
  IMethodFindAllOptions,
  IMethodFindOneOptions,
  IMethodCountOptions,
  IMethodUpdateOptions,
  IMethodDestroyOptions,
  IMethodRestoreOptions,
  IMethodBulkDestroyOptions
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
    queryBuilder: (ctx) => {
      ctx.req
      ctx.res

      return {}
    },
    response: (ctx) => {
      ctx.req
      ctx.res
      ctx.instance

      return {}
    }
  }),

  // COUNT
  count: (): IMethodCountOptions => ({
    template: 'count',
    model: 'Customer',
    queryBuilder(ctx) {
      ctx.req
      ctx.res

      return {}
    },
    async response(ctx) {
      ctx.req
      ctx.res
      ctx.count

      return {}
    }
  }),

  // UPDATE
  update: (): IMethodUpdateOptions => ({
    template: 'update',
    model: 'Customer',
    state: (ctx) => {
      ctx.req
      ctx.res

      return {}
    },
    key: 'customerId',
    queryBuilder: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return {}
    },
    validator: true,
    rules: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance

      return {}
    },
    only: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance

      return []
    },
    formatter: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
      ctx.fields
    },
    beforeUpdate: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
      ctx.fields
    },
    afterUpdate: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
      ctx.fields
    },
    sendStatus: true,
    response: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
      ctx.fields

      return {}
    }
  }),

  // DESTROY
  destroy: (): IMethodDestroyOptions => ({
    template: 'destroy',
    model: 'Customer',
    state: (ctx) => {
      ctx.req
      ctx.res

      return {}
    },
    key: 'customerId',
    queryBuilder: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return {}
    },
    force: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance

      return true
    },
    beforeDestroy: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
    },
    afterDestroy: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
    },
    sendStatus: true,
    response: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance

      return {}
    }
  }),

  // BULK-DESTROY
  bulkDestroy: (): IMethodBulkDestroyOptions => ({
    template: 'bulkDestroy',
    model: 'Customer',
    state: (ctx) => {
      ctx.req
      ctx.res

      return {}
    },
    queryBuilder: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return {}
    },
    force: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return true
    },
    beforeDestroy: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
    },
    afterDestroy: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.count
    },
    sendStatus: true,
    response: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.count

      return {}
    }
  }),

  // RESTORE
  restore: (): IMethodRestoreOptions => ({
    template: 'restore',
    model: 'Customer',
    state: (ctx) => {
      ctx.req
      ctx.res

      return {}
    },
    key: 'customerId',
    queryBuilder: (ctx) => {
      ctx.req
      ctx.res
      ctx.state

      return {}
    },
    beforeRestore: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
    },
    afterRestore: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance
    },
    sendStatus: true,
    response: (ctx) => {
      ctx.req
      ctx.res
      ctx.state
      ctx.instance

      return {}
    }
  })
})

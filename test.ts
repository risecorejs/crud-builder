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

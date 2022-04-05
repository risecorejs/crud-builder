const models = require('@risecorejs/core/models')
const httpStatusCodes = require('http-status-codes')

const templates = {
  create,
  index,
  show,
  update,
  bulkUpdate,
  destroy,
  bulkDestroy
}

/**
 * CRUD-BUILDER
 * @param options {{
 *   model: string|Object,
 *   endpoints: Object
 * }}
 * @return {Object}
 */
module.exports = (options) => {
  const endpoints = {}

  const Model = getModel(options.model)

  for (const endpoint in options.endpoints) {
    if (options.endpoints[endpoint]) {
      const getEndpointOptions =
        typeof options.endpoints[endpoint] === 'function'
          ? options.endpoints[endpoint]
          : () => options.endpoints[endpoint]

      const handler = templates[endpoint]

      const endpointOptions = getEndpointOptions()

      if (handler) {
        endpoints[endpoint] = handler(getEndpointOptions, Model)
      } else if (endpointOptions.template) {
        const _handler = templates[endpointOptions.template]

        if (_handler) {
          endpoints[endpoint] = _handler(getEndpointOptions, Model)
        } else {
          throw Error(`CRUD template "${endpointOptions.template}" not found`)
        }
      }
    }
  }

  return endpoints
}

/**
 * CREATE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   validator: boolean?,
 *   rules: Object|Function?,
 *   fields: string|Object|Array|Function?,
 *   formatter: Function?,
 *   beforeCreate: Function?,
 *   afterCreate: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function create(getOptions, Model) {
  return async (req, res) => {
    let options = getOptions()

    try {
      if (options === true) options = {}

      const context = {
        req,
        state: await getContextState(req, options),
        fields: null,
        instance: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const errors = await getValidationErrors(req, options)

      if (errors) {
        return res.status(400).json({ errors })
      }

      if (typeof options.fields === 'function') {
        options.fields = await options.fields(context)
      }

      context.fields = options.fields ? req.only(options.fields) : req.body

      if (options.formatter) {
        await options.formatter(context)
      }

      if (options.beforeCreate) {
        await options.beforeCreate(context)
      }

      context.instance = await Model.create(context.fields)

      if (options.afterCreate) {
        await options.afterCreate(context)
      }

      if (options.response) {
        const response = await options.response(context)

        return res.status(201).json(response)
      }

      return res.status(201).json({ result: context.instance })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * INDEX
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   method: "findAndCountAll"|"findAll"?,
 *   pagination: boolean?,
 *   queryBuilder: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function index(getOptions, Model) {
  return async (req, res) => {
    let options = getOptions()

    try {
      if (options === true) options = {}

      if (options.model) {
        Model = getModel(options.model)
      }

      options.method ||= 'findAndCountAll'

      const queryOptions = {
        order: [['id', 'DESC']]
      }

      if (options.method === 'findAndCountAll') {
        queryOptions.distinct = true
      }

      if (options.pagination !== false) {
        Object.assign(queryOptions, req.pagination())
      }

      if (options.queryBuilder) {
        Object.assign(queryOptions, await options.queryBuilder(req))
      }

      const instances = await Model[options.method](queryOptions)

      if (options.response) {
        const response = await options.response(instances, req)

        return res.json(response)
      }

      return res.json({ result: instances })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * SHOW
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   key: "id" | string | false?,
 *   queryBuilder: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function show(getOptions, Model) {
  return async (req, res) => {
    let options = getOptions()

    try {
      if (options === true) options = {}

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = {
        where: {}
      }

      if (options.key !== false) {
        options.key ||= 'id'

        queryOptions.where[options.key] = req.params[options.key]
      }

      if (options.queryBuilder) {
        const _queryOptions = await options.queryBuilder(req)

        if (_queryOptions.where) {
          Object.assign(queryOptions.where, _queryOptions.where)
        }

        delete _queryOptions.where

        Object.assign(queryOptions, _queryOptions)
      }

      const instance = await Model.findOne(queryOptions)

      if (!instance) {
        return res.sendStatus(404)
      }

      if (options.response) {
        const response = await options.response(instance, req)

        return res.json(response)
      }

      return res.json({ result: instance })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * UPDATE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   key: "id" | string | false?,
 *   queryBuilder: Function?,
 *   validator: boolean?,
 *   rules: Object|Function?,
 *   fields: string|Object|Array|Function?,
 *   formatter: Function?,
 *   beforeUpdate: Function?,
 *   afterUpdate: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function update(getOptions, Model) {
  return async (req, res) => {
    try {
      let options = getOptions()

      if (options === true) options = {}

      const context = {
        req,
        state: await getContextState(req, options),
        fields: null,
        instance: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = {
        where: {}
      }

      if (options.key !== false) {
        options.key ||= 'id'

        queryOptions.where[options.key] = req.params[options.key]
      }

      if (options.queryBuilder) {
        const _queryOptions = await options.queryBuilder(context)

        if (_queryOptions.where) {
          Object.assign(queryOptions.where, _queryOptions.where)
        }

        delete _queryOptions.where

        Object.assign(queryOptions, _queryOptions)
      }

      context.instance = await Model.findOne(queryOptions)

      if (!context.instance) {
        return res.sendStatus(404)
      }

      const errors = await getValidationErrors(req, options)

      if (errors) {
        return res.status(400).json({ errors })
      }

      if (typeof options.fields === 'function') {
        options.fields = await options.fields(context)
      }

      context.fields = options.fields ? req.only(options.fields) : req.body

      if (options.formatter) {
        await options.formatter(context)
      }

      if (options.beforeUpdate) {
        await options.beforeUpdate(context)
      }

      await context.instance.update(context.fields)

      if (options.afterUpdate) {
        await options.afterUpdate(context)
      }

      if (options.response) {
        const response = await options.response(context)

        return res.json(response)
      }

      return res.json({ result: context.instance })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * BULK-UPDATE
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   queryBuilder: Function?,
 *   validator: boolean?,
 *   rules: Object|Function?,
 *   fields: string|Object|Array|Function?,
 *   formatter: Function?,
 *   beforeUpdate: Function?,
 *   afterUpdate: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function bulkUpdate(getOptions, Model) {
  return async (req, res) => {
    try {
      let options = getOptions()

      if (options === true) options = {}

      const context = {
        req,
        state: await getContextState(req, options),
        fields: null,
        result: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = {}

      if (options.queryBuilder) {
        const _queryOptions = await options.queryBuilder(context)

        Object.assign(queryOptions, _queryOptions)
      }

      const errors = await getValidationErrors(req, options)

      if (errors) {
        return res.status(400).json({ errors })
      }

      if (typeof options.fields === 'function') {
        options.fields = await options.fields(context)
      }

      context.fields = options.fields ? req.only(options.fields) : req.body

      if (options.formatter) {
        await options.formatter(context)
      }

      if (options.beforeUpdate) {
        await options.beforeUpdate(context)
      }

      context.result = await Model.update(context.fields, queryOptions)

      if (options.afterUpdate) {
        await options.afterUpdate(context)
      }

      if (options.response) {
        const response = await options.response(context)

        return res.json(response)
      }

      return res.json({ result: context.result })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * DESTROY
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   key: "id" | string | false?,
 *   queryBuilder: Function?,
 *   force: boolean?,
 *   beforeDestroy: Function?,
 *   afterDestroy: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function destroy(getOptions, Model) {
  return async (req, res) => {
    try {
      let options = getOptions()

      if (options === true) options = {}

      const context = {
        req,
        state: await getContextState(req, options),
        instance: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = {
        where: {}
      }

      if (options.key !== false) {
        options.key ||= 'id'

        queryOptions.where[options.key] = req.params[options.key]
      }

      if (options.queryBuilder) {
        const _queryOptions = await options.queryBuilder(context)

        if (_queryOptions.where) {
          Object.assign(queryOptions.where, _queryOptions.where)
        }

        delete _queryOptions.where

        Object.assign(queryOptions, _queryOptions)
      }

      context.instance = await Model.findOne(queryOptions)

      if (!context.instance) {
        return res.sendStatus(404)
      }

      const destroyOptions = {}

      if (options.force) {
        if (typeof options.force === 'function') {
          destroyOptions.force = await options.force(context)
        } else {
          destroyOptions.force = true
        }
      }

      if (options.beforeDestroy) {
        await options.beforeDestroy(context)
      }

      await context.instance.destroy(destroyOptions)

      if (options.afterDestroy) {
        await options.afterDestroy(context)
      }

      if (options.response) {
        const response = await options.response(context)

        return res.json(response)
      }

      return res.json({ result: context.instance })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * BULK-DESTROY
 * @param getOptions {Function: () => ({
 *   model: string|Object?,
 *   state: Object|Function?,
 *   queryBuilder: Function?,
 *   force: boolean?,
 *   beforeDestroy: Function?,
 *   afterDestroy: Function?,
 *   response: Function?
 * }|true)}
 * @param Model {Object}
 * @return {Function}
 */
function bulkDestroy(getOptions, Model) {
  return async (req, res) => {
    try {
      let options = getOptions()

      if (options === true) options = {}

      const context = {
        req,
        state: await getContextState(req, options),
        result: null
      }

      if (options.model) {
        Model = getModel(options.model)
      }

      const queryOptions = {}

      if (options.queryBuilder) {
        const _queryOptions = await options.queryBuilder(context)

        Object.assign(queryOptions, _queryOptions)
      }

      if (options.force) {
        if (typeof options.force === 'function') {
          queryOptions.force = await options.force(context)
        } else {
          queryOptions.force = true
        }
      }

      if (options.beforeDestroy) {
        await options.beforeDestroy(context)
      }

      context.result = await Model.destroy(queryOptions)

      if (options.afterDestroy) {
        await options.afterDestroy(context)
      }

      if (options.response) {
        const response = await options.response(context)

        return res.json(response)
      }

      return res.json({ result: context.result })
    } catch (err) {
      return errorResponse(err, res)
    }
  }
}

/**
 * GET-CONTEXT-STATE
 * @param req {Object}
 * @param options {Object}
 * @return {Promise<Object>}
 */
async function getContextState(req, options) {
  if (options.state) {
    if (typeof options.state === 'function') {
      return await options.state(req)
    } else {
      return options.state
    }
  } else {
    return {}
  }
}

/**
 * GET-MODEL
 * @param model {string|Object}
 * @return {Object}
 */
function getModel(model) {
  return typeof model === 'string' ? models[model] : model
}

/**
 * GET-VALIDATION-ERRORS
 * @param req {Object}
 * @param options {Object}
 * @return {Promise<void|Object>}
 */
async function getValidationErrors(req, options) {
  if (options.validator !== false && options.rules) {
    if (typeof options.rules === 'function') {
      options.rules = await options.rules(context)
    }

    const errors = await req.validator(options.rules)

    if (errors) {
      return errors
    }
  }
}

/**
 * ERROR-RESPONSE
 * @param err {Object}
 * @param res {Object}
 * @return {any}
 */
function errorResponse(err, res) {
  const status = err.status || err.response?.status || 500

  return res.status(status).json({
    status,
    message: err.message || httpStatusCodes.getStatusText(status)
  })
}

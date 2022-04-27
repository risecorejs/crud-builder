module.exports = {
  create: require('./create'),

  index: require('./find-all'),
  show: require('./find-one'),
  count: require('./count'),

  update: require('./update'),
  bulkUpdate: require('./bulk-update'),

  destroy: require('./destroy'),
  bulkDestroy: require('./bulk-destroy'),

  restore: require('./restore'),
  bulkRestore: require('./bulk-restore')
}

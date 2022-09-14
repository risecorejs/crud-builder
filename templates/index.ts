import create from './create'

import index from './find-all'
import show from './find-one'
import count from './count'

import update from './update'
// import bulkUpdate from './bulk-update'

import destroy from './destroy'
// import bulkDestroy from './bulk-destroy'

import restore from './destroy'
// import bulkRestore from './bulk-restore'

import { IFields } from '../interfaces'
import { TTemplateHandler } from '../types'

export default <IFields<TTemplateHandler<any>>>{
  create,
  index,
  show,
  count,
  update,
  destroy,
  restore
}

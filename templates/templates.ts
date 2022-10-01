import create from './create'

import index from './index'
import show from './show'
import count from './count'

import update from './update'
import bulkUpdate from './bulk-update'

import destroy from './destroy'
import bulkDestroy from './bulk-destroy'

import restore from './restore'
import bulkRestore from './bulk-restore'

import { ITemplates } from '../interfaces'

export default <ITemplates>{
  create,

  index,
  show,
  count,

  update,
  bulkUpdate,

  destroy,
  bulkDestroy,

  restore,
  bulkRestore
}

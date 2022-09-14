import create from './create'
import index from './find-all'
import show from './find-one'
import count from './count'
import update from './update'

import { IFields } from '../interfaces'
import { TTemplateHandler } from '../types'

export default <IFields<TTemplateHandler<any>>>{ create, index, show, count, update }

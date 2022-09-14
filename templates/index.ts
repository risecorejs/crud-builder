import create from './create'
import update from './update'

import { IFields } from '../interfaces'
import { TTemplateHandler } from '../types'

export default <IFields<TTemplateHandler<any>>>{ create, update }

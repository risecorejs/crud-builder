import { FindOptions } from 'sequelize/types/model'

import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index'
import { IMethodQueryBuilderHandlerWithContext, TMethodResponseHandlerWithContext, CModel } from '../../types'

export interface IMethodFindAllOptions extends IMethodBaseOptions {
  template?: 'index'
  method?: 'findAndCountAll' | 'findAll'
  pagination?: boolean
  queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodFindAllContextOptions, 'instances'>>
  response?: TMethodResponseHandlerWithContext<
    Omit<IMethodFindAllContextOptions, 'instances'> & { instances: { rows: CModel[]; count: number } | CModel[] }
  >
}

export interface IMethodFindAllContextOptions extends IMethodBaseContextOptions {
  instances?: { rows: CModel[]; count: number } | CModel[]
}

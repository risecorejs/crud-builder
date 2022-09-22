import { FindOptions } from 'sequelize';
import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index';
import { IMethodQueryBuilderHandlerWithContext, TMethodResponseHandlerWithContext } from '../../types';
export interface IMethodFindAllOptions<M = any> extends IMethodBaseOptions {
    template?: 'index';
    method?: 'findAndCountAll' | 'findAll';
    pagination?: boolean;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodFindAllContextOptions<M>, 'instances'>>;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodFindAllContextOptions<M>, 'instances'> & {
        instances: {
            rows: M[];
            count: number;
        } | M[];
    }>;
}
export interface IMethodFindAllContextOptions<M = any> extends IMethodBaseContextOptions {
    instances?: {
        rows: M[];
        count: number;
    } | M[];
}

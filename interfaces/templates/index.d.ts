import { FindOptions } from 'sequelize';
import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index';
import { IMethodQueryBuilderHandlerWithContext, TMethodResponseHandlerWithContext } from '../../types';
export interface IMethodIndexOptions<M = any> extends IMethodBaseOptions {
    template?: 'index';
    method?: 'findAndCountAll' | 'findAll';
    pagination?: boolean;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodIndexContextOptions<M>, 'instances'>>;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodIndexContextOptions<M>, 'instances'> & {
        instances: {
            rows: M[];
            count: number;
        } | M[];
    }>;
}
export interface IMethodIndexContextOptions<M = any> extends IMethodBaseContextOptions {
    instances?: {
        rows: M[];
        count: number;
    } | M[];
}

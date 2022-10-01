import { FindOptions } from 'sequelize';
import { IMethodBaseOptions, IMethodBaseContextOptions } from '../index';
import { TMethodKey, IMethodQueryBuilderHandlerWithContext, TMethodResponseHandlerWithContext } from '../../types';
export interface IMethodShowOptions<M = any> extends IMethodBaseOptions {
    template?: 'show';
    key?: TMethodKey;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodShowContextOptions<M>, 'instance'>>;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodShowContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
}
export interface IMethodShowContextOptions<M = any> extends IMethodBaseContextOptions {
    instance?: null | M;
}

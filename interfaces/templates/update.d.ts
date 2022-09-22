import { FindOptions } from 'sequelize';
import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index';
import { TMethodState, TMethodKey, IMethodQueryBuilderHandlerWithContext, TMethodRules, TMethodOnly, TMethodHookHandler, TMethodResponseHandlerWithContext } from '../../types';
export interface IMethodUpdateOptions<M = any> extends IMethodBaseOptions {
    template?: 'update';
    state?: TMethodState<Omit<IMethodUpdateContextOptions<M>, 'state' | 'fields' | 'instance'>>;
    key?: TMethodKey;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodUpdateContextOptions<M>, 'fields' | 'instance'>>;
    validator?: boolean;
    rules?: TMethodRules<Omit<IMethodUpdateContextOptions<M>, 'fields' | 'instance'> & {
        instance: M;
    }>;
    only?: TMethodOnly<Omit<IMethodUpdateContextOptions<M>, 'fields' | 'instance'> & {
        instance: M;
    }>;
    formatter?: TMethodHookHandler<Omit<IMethodUpdateContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
    beforeUpdate?: TMethodHookHandler<Omit<IMethodUpdateContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
    afterUpdate?: TMethodHookHandler<Omit<IMethodUpdateContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
    sendStatus?: boolean;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodUpdateContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
}
export interface IMethodUpdateContextOptions<M = any> extends IMethodBaseContextOptions {
    state: IFields;
    fields: null | IFields;
    instance?: null | M;
}

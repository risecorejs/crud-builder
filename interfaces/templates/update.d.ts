import { FindOptions } from 'sequelize/types/model';
import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index';
import { TMethodState, TMethodKey, IMethodQueryBuilderHandlerWithContext, TMethodRules, TMethodOnly, TMethodHookHandler, TMethodResponseHandlerWithContext, CModel } from '../../types';
export interface IMethodUpdateOptions extends IMethodBaseOptions {
    template?: 'update';
    state?: TMethodState<Omit<IMethodUpdateContextOptions, 'state' | 'fields' | 'instance'>>;
    key?: TMethodKey;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodUpdateContextOptions, 'fields' | 'instance'>>;
    validator?: boolean;
    rules?: TMethodRules<Omit<IMethodUpdateContextOptions, 'fields' | 'instance'> & {
        instance: CModel;
    }>;
    only?: TMethodOnly<Omit<IMethodUpdateContextOptions, 'fields' | 'instance'> & {
        instance: CModel;
    }>;
    formatter?: TMethodHookHandler<Omit<IMethodUpdateContextOptions, 'instance'> & {
        instance: CModel;
    }>;
    beforeUpdate?: TMethodHookHandler<Omit<IMethodUpdateContextOptions, 'instance'> & {
        instance: CModel;
    }>;
    afterUpdate?: TMethodHookHandler<Omit<IMethodUpdateContextOptions, 'instance'> & {
        instance: CModel;
    }>;
    sendStatus?: boolean;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodUpdateContextOptions, 'instance'> & {
        instance: CModel;
    }>;
}
export interface IMethodUpdateContextOptions extends IMethodBaseContextOptions {
    state: IFields;
    fields: null | IFields;
    instance?: null | CModel;
}

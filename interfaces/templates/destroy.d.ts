import { FindOptions } from 'sequelize/types/model';
import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index';
import { TMethodState, TMethodKey, IMethodQueryBuilderHandlerWithContext, TMethodHookHandler, TMethodResponseHandlerWithContext, CModel } from '../../types';
export interface IMethodDestroyOptions extends IMethodBaseOptions {
    template?: 'destroy';
    state?: TMethodState<Omit<IMethodDestroyContextOptions, 'state' | 'instance'>>;
    key?: TMethodKey;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodDestroyContextOptions, 'instance'>>;
    force?: boolean | ((ctx: Omit<IMethodDestroyContextOptions, 'instance'> & {
        instance: CModel;
    }) => boolean | Promise<boolean>);
    beforeDestroy?: TMethodHookHandler<Omit<IMethodDestroyContextOptions, 'instance'> & {
        instance: CModel;
    }>;
    afterDestroy?: TMethodHookHandler<Omit<IMethodDestroyContextOptions, 'instance'> & {
        instance: CModel;
    }>;
    sendStatus?: boolean;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodDestroyContextOptions, 'instance'> & {
        instance: CModel;
    }>;
}
export interface IMethodDestroyContextOptions extends IMethodBaseContextOptions {
    state: IFields;
    instance?: null | CModel;
}

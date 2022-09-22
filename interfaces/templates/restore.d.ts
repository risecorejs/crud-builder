import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index';
import { TMethodState, TMethodKey, IMethodQueryBuilderHandlerWithContext, TMethodHookHandler, TMethodResponseHandlerWithContext } from '../../types';
export interface IMethodRestoreOptions<M = any> extends IMethodBaseOptions {
    template?: 'restore';
    state?: TMethodState<Omit<IMethodRestoreContextOptions<M>, 'state' | 'instance'>>;
    key?: TMethodKey;
    queryBuilder?: IFields | IMethodQueryBuilderHandlerWithContext<Omit<IMethodRestoreContextOptions<M>, 'instance'>>;
    beforeRestore?: TMethodHookHandler<Omit<IMethodRestoreContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
    afterRestore?: TMethodHookHandler<Omit<IMethodRestoreContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
    sendStatus?: boolean;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodRestoreContextOptions<M>, 'instance'> & {
        instance: M;
    }>;
}
export interface IMethodRestoreContextOptions<M = any> extends IMethodBaseContextOptions {
    state: IFields;
    instance?: null | M;
}

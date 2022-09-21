import { FindOptions } from 'sequelize/types/model';
import { IMethodBaseOptions, IMethodBaseContextOptions, IFields } from '../index';
import { TMethodState, IMethodQueryBuilderHandlerWithContext, TMethodHookHandler, TMethodResponseHandlerWithContext } from '../../types';
export interface IMethodBulkDestroyOptions extends IMethodBaseOptions {
    template?: 'bulkDestroy';
    state?: TMethodState<Omit<IMethodBulkDestroyContextOptions, 'state' | 'count'>>;
    queryBuilder?: FindOptions | IMethodQueryBuilderHandlerWithContext<Omit<IMethodBulkDestroyContextOptions, 'count'>>;
    force?: boolean | ((ctx: Omit<IMethodBulkDestroyContextOptions, 'count'>) => boolean | Promise<boolean>);
    beforeDestroy?: TMethodHookHandler<Omit<IMethodBulkDestroyContextOptions, 'count'>>;
    afterDestroy?: TMethodHookHandler<Omit<IMethodBulkDestroyContextOptions, 'count'> & {
        count: number;
    }>;
    sendStatus?: boolean;
    response?: TMethodResponseHandlerWithContext<Omit<IMethodBulkDestroyContextOptions, 'count'> & {
        count: number;
    }>;
}
export interface IMethodBulkDestroyContextOptions extends IMethodBaseContextOptions {
    state: IFields;
    count?: number;
}

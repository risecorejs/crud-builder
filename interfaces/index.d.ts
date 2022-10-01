import express from 'express';
import { TTemplateHandler, TGettingOptionsInstruction, TTemplates } from '../types';
export * from './templates/create';
import { IMethodCreateOptions } from './templates/create';
export * from './templates/index';
import { IMethodIndexOptions } from './templates/index';
export * from './templates/show';
import { IMethodShowOptions } from './templates/show';
export * from './templates/count';
import { IMethodCountOptions } from './templates/count';
export * from './templates/update';
import { IMethodUpdateOptions } from './templates/update';
export * from './templates/bulk-update';
import { IMethodBulkUpdateOptions } from './templates/bulk-update';
export * from './templates/destroy';
import { IMethodDestroyOptions } from './templates/destroy';
export * from './templates/bulk-destroy';
import { IMethodBulkDestroyOptions } from './templates/bulk-destroy';
export * from './templates/restore';
import { IMethodRestoreOptions } from './templates/restore';
export * from './templates/bulk-restore';
import { IMethodBulkRestoreOptions } from './templates/bulk-restore';
export interface IFields<T = any> {
    [key: string]: T;
}
export interface ITemplates {
    create: TTemplateHandler<IMethodCreateOptions>;
    index: TTemplateHandler<IMethodIndexOptions>;
    show: TTemplateHandler<IMethodShowOptions>;
    count: TTemplateHandler<IMethodCountOptions>;
    update: TTemplateHandler<IMethodUpdateOptions>;
    bulkUpdate: TTemplateHandler<IMethodBulkUpdateOptions>;
    destroy: TTemplateHandler<IMethodDestroyOptions>;
    bulkDestroy: TTemplateHandler<IMethodBulkDestroyOptions>;
    restore: TTemplateHandler<IMethodRestoreOptions>;
    bulkRestore: TTemplateHandler<IMethodBulkRestoreOptions>;
}
export interface IMethods<M = any> {
    create?: TGettingOptionsInstruction<IMethodCreateOptions<M>>;
    index?: TGettingOptionsInstruction<IMethodIndexOptions<M>>;
    show?: TGettingOptionsInstruction<IMethodShowOptions<M>>;
    count?: TGettingOptionsInstruction<IMethodCountOptions>;
    update?: TGettingOptionsInstruction<IMethodUpdateOptions<M>>;
    bulkUpdate?: TGettingOptionsInstruction<IMethodBulkUpdateOptions>;
    destroy?: TGettingOptionsInstruction<IMethodDestroyOptions<M>>;
    bulkDestroy?: TGettingOptionsInstruction<IMethodBulkDestroyOptions>;
    restore?: TGettingOptionsInstruction<IMethodRestoreOptions<M>>;
    bulkRestore?: TGettingOptionsInstruction<IMethodBulkRestoreOptions>;
    [key: string]: any;
}
export interface IEndpoints {
    [key: string]: express.Handler;
}
export interface IMethodBaseOptions {
    template?: TTemplates;
    model?: any;
}
export interface IMethodBaseContextOptions {
    req: express.Request;
    res: express.Response;
}
export interface IMethodErrorResponse {
    status: number;
    message: string;
    errors?: any;
}

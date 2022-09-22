import express from 'express';
import { TKeys as TOnlyKeys } from '@risecorejs/only/types';
import { IRules as IValidatorRules } from '@risecorejs/validator/interfaces';
import { Model, FindOptions } from 'sequelize';
import { IFields } from '../interfaces';
export declare class CModel extends Model {
}
export declare type TTemplates = 'create' | 'index' | 'show' | 'count' | 'update' | 'bulkUpdate' | 'destroy' | 'bulkDestroy' | 'restore' | 'bulkRestore';
export declare type TGettingOptionsInstruction<T = any> = true | (() => T);
export declare type TTemplateHandler<T> = (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<T>) => express.Handler;
export declare type TMethodKey = 'id' | string | false;
export declare type TMethodState<C = any> = object | ((ctx: C) => object | Promise<object>);
export declare type TMethodRules<C = any> = IValidatorRules | ((ctx: C) => IValidatorRules | Promise<IValidatorRules>);
export declare type TMethodOnly<C = any> = TOnlyKeys | ((ctx: C) => TOnlyKeys | Promise<TOnlyKeys>);
export declare type IMethodQueryBuilderHandlerWithContext<C = any> = (ctx: C) => FindOptions | Promise<FindOptions>;
export declare type TMethodHookHandler<C = any> = (ctx: C) => void | Promise<void>;
export declare type TMethodResponseHandlerWithContext<C = any> = (ctx: C) => IFields | Promise<IFields>;

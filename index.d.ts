import { IMethods, IEndpoints } from './interfaces';
/**
 * CRUD-BUILDER
 * @param model {any}
 * @param methods {IMethods}
 * @return {IEndpoints}
 */
export default function <M = any>(model: any, methods: IMethods<M>): IEndpoints;

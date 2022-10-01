import express from 'express';
import { M } from '../classes';
import { IMethodBulkUpdateOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * BULK-UPDATE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkUpdateOptions>): express.Handler;

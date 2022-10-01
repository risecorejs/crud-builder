import express from 'express';
import { M } from '../classes';
import { IMethodBulkRestoreOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * BULK-RESTORE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkRestoreOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkRestoreOptions>): express.Handler;

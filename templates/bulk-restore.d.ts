import express from 'express';
import { IMethodBulkRestoreOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * BULK-RESTORE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkRestoreOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkRestoreOptions>): express.Handler;

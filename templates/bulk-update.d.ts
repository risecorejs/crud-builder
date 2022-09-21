import express from 'express';
import { IMethodBulkUpdateOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * BULK-UPDATE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkUpdateOptions>): express.Handler;

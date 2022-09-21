import express from 'express';
import { IMethodBulkDestroyOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * BULK-DESTROY
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkDestroyOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkDestroyOptions>): express.Handler;

import express from 'express';
import { M } from '../classes';
import { IMethodBulkDestroyOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * BULK-DESTROY
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodBulkDestroyOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodBulkDestroyOptions>): express.Handler;

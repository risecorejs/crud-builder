import express from 'express';
import { IMethodRestoreOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * RESTORE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodRestoreOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodRestoreOptions>): express.Handler;

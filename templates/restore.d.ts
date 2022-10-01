import express from 'express';
import { M } from '../classes';
import { IMethodRestoreOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * RESTORE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodRestoreOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodRestoreOptions>): express.Handler;

import express from 'express';
import { IMethodUpdateOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * UPDATE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodUpdateOptions>): express.Handler;

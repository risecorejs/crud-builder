import express from 'express';
import { IMethodDestroyOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * DESTROY
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodDestroyOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodDestroyOptions>): express.Handler;

import express from 'express';
import { M } from '../classes';
import { IMethodDestroyOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * DESTROY
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodDestroyOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodDestroyOptions>): express.Handler;

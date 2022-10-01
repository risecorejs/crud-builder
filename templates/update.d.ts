import express from 'express';
import { M } from '../classes';
import { IMethodUpdateOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * UPDATE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodUpdateOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodUpdateOptions>): express.Handler;

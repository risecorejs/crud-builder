import express from 'express';
import { M } from '../classes';
import { IMethodIndexOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * FIND-ALL
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodIndexOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodIndexOptions>): express.Handler;

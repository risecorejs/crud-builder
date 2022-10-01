import express from 'express';
import { M } from '../classes';
import { IMethodCountOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * COUNT
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCountOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCountOptions>): express.Handler;

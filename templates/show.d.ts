import express from 'express';
import { M } from '../classes';
import { IMethodShowOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * FIND-ONE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodShowOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodShowOptions>): express.Handler;

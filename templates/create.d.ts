import express from 'express';
import { M } from '../classes';
import { IMethodCreateOptions } from '../interfaces';
import { TGettingOptionsInstruction } from '../types';
/**
 * CREATE
 * @param Model {typeof M}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCreateOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof M, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCreateOptions>): express.Handler;

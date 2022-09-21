import express from 'express';
import { CModel, TGettingOptionsInstruction } from '../types';
import { IMethodFindAllOptions } from '../interfaces';
/**
 * FIND-ALL
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodFindAllOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodFindAllOptions>): express.Handler;

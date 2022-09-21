import express from 'express';
import { IMethodFindOneOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * FIND-ONE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodFindOneOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodFindOneOptions>): express.Handler;

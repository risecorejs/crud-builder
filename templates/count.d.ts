import express from 'express';
import { IMethodCountOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * COUNT
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCountOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCountOptions>): express.Handler;

import express from 'express';
import { IMethodCreateOptions } from '../interfaces';
import { CModel, TGettingOptionsInstruction } from '../types';
/**
 * CREATE
 * @param Model {typeof CModel}
 * @param gettingOptionsInstruction {TGettingOptionsInstruction<IMethodCreateOptions>)}
 * @return {express.Handler}
 */
export default function (Model: typeof CModel, gettingOptionsInstruction: TGettingOptionsInstruction<IMethodCreateOptions>): express.Handler;

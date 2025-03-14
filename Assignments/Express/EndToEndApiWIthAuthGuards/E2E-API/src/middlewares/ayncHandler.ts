import express from "express"
import { Request, Response, NextFunction } from "express"
import { request } from "http"

/** 
*@desc - Avoid the problems of try catches
*@param fn The async function catches errors
*@returns
*/
export const asyncHandler = <T = any, R extends Request = Request>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
    return (req: R, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}
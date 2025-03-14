import { Request, Response, NextFunction } from "express";

//ensures that any errors are automatically forwarded to express
const asyncHandler = <T = any>(
    fn: (req: Request, res:Response, next: NextFunction) => Promise<T>
) => {
    return (req: Request, res:Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

export default asyncHandler
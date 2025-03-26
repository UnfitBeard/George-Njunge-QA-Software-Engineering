import { Request, Response, NextFunction } from "express";
import { RoleRequest } from "../../utils/types/userRoles"
import asyncHandler from "../asyncHandler";


//ensure user has required roles 
export const roleGuard = (allowedRoles: number[]) => asyncHandler<void, RoleRequest>(async (req: RoleRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(403).json({ message: "User Not found" });
        return;
    }
    if (!allowedRoles.includes(req.user.role_id)) {
        res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
        return;
    }
    next();
});

export const adminGuard = roleGuard([11]);
export const librarianGuard = roleGuard([12]);
export const borrowerGuard = roleGuard([11, 12, 13]);
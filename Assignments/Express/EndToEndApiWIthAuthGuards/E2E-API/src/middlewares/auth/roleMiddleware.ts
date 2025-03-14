import { asyncHandler } from "../ayncHandler"
import RoleRequest from "../../utils/types/userRoleTypes"

export const roleGuard = (allowedRoles<string[]|number[]>) => {
    asyncHandler<void, RoleRequest>(async(req: RoleRequest, res, next)=>{
        if (!req.user || !allowedRoles.includes(req.user.role_id)) {
            res.status(403).json({message: "Access Denied Insufficient Permission"})
            return
        }
        next()
    })
}

export const adminGuard = roleGuard(["Admin"])
export const librarianGuard = roleGuard(["Librarian"])
export const borrowerGuard = roleGuard(["Borrower"])
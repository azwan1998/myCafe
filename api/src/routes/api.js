import express from "express";
import userController from "../controller/user-controller.js";
import {authenticateToken,checkUserRole} from "../middleware/auth-middleware.js";
import profileController from "../controller/profile-controller.js";

const userRouter = new express.Router();
userRouter.use(authenticateToken);

// User API
userRouter.post('/api/users', checkUserRole(["superadmin"]),userController.register);
userRouter.patch('/api/users/resetPassword/:id',checkUserRole(["superadmin"]), userController.resetPassword);
userRouter.patch('/api/users/isActive/:id',checkUserRole(["superadmin"]), userController.isActive);
userRouter.get('/api/users/',checkUserRole(["superadmin"]), userController.listUser);
userRouter.patch('/api/users/changePassword', checkUserRole(["superadmin","admin"]),userController.changePassword);

//PROFILE API
userRouter.post('/api/profiles/', checkUserRole(["superadmin","kasir","admin"]),profileController.addOrUpdate);
userRouter.get('/api/profiles/', checkUserRole(["superadmin","kasir","admin"]),profileController.showProfile);

export {
    userRouter,
}
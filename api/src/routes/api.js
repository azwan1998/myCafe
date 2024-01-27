import express from "express";
import userController from "../controller/user-controller.js";
import {authenticateToken,checkUserRole} from "../middleware/auth-middleware.js";
import profileController from "../controller/profile-controller.js";
import cafeController from "../controller/cafe-controller.js";
import menuController from "../controller/menu-controller.js";

const userRouter = new express.Router();
userRouter.use(authenticateToken);

// USER API
userRouter.post('/api/users', checkUserRole(["superadmin"]),userController.register);
userRouter.patch('/api/users/resetPassword/:id',checkUserRole(["superadmin"]), userController.resetPassword);
userRouter.patch('/api/users/isActive/:id',checkUserRole(["superadmin"]), userController.isActive);
userRouter.get('/api/users/',checkUserRole(["superadmin"]), userController.listUser);
userRouter.patch('/api/users/changePassword', checkUserRole(["superadmin","admin"]),userController.changePassword);

//PROFILE API
userRouter.post('/api/profiles/', checkUserRole(["superadmin","kasir","admin"]),profileController.addOrUpdate);
userRouter.get('/api/profiles/', checkUserRole(["superadmin","kasir","admin"]),profileController.showProfile);

//CAFE API
userRouter.post('/api/cafes/', checkUserRole(["superadmin","kasir","admin"]),cafeController.addCafe);
userRouter.patch('/api/cafes/update/:id', checkUserRole(["superadmin","kasir","admin"]),cafeController.updateCafe);
userRouter.get('/api/cafes/', checkUserRole(["superadmin","supervisior"]),cafeController.showCafe);
userRouter.delete('/api/cafes/:id', checkUserRole(["superadmin","supervisior"]),cafeController.deleteCafe);

//MENU API
userRouter.post('/api/menu/', checkUserRole(["superadmin","admin"]),menuController.addMenu);
userRouter.patch('/api/menu/update/:id', checkUserRole(["superadmin","admin"]),menuController.updateMenu);
userRouter.delete('/api/menu/delete/:id', checkUserRole(["superadmin","admin"]),menuController.deleteMenu);


export {
    userRouter,
}
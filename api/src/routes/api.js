import express from "express";
import userController from "../controller/user-controller.js";
import {authenticateToken,checkUserRole} from "../middleware/auth-middleware.js";
import profileController from "../controller/profile-controller.js";
import cafeController from "../controller/cafe-controller.js";
import menuController from "../controller/menu-controller.js";
import productController from "../controller/product-controller.js";
import typeController from "../controller/type-controller.js";
import priceController from "../controller/price-controller.js";
import mejaController from "../controller/meja-controller.js";

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
userRouter.delete('/api/cafes/delete/:id', checkUserRole(["superadmin","supervisior"]),cafeController.deleteCafe);

//MENU API
userRouter.post('/api/menu/', checkUserRole(["superadmin","admin"]),menuController.addMenu);
userRouter.patch('/api/menu/update/:id', checkUserRole(["superadmin","admin"]),menuController.updateMenu);
userRouter.delete('/api/menu/delete/:id', checkUserRole(["superadmin","admin"]),menuController.deleteMenu);


//PRODUCT API
userRouter.post('/api/products/', checkUserRole(["superadmin","admin"]),productController.addProduct);
userRouter.patch('/api/products/update/:id', checkUserRole(["superadmin","admin"]),productController.updateProduct);
userRouter.delete('/api/products/delete/:id', checkUserRole(["superadmin","admin"]),productController.deleteProduct);
userRouter.get('/api/products/', checkUserRole(["superadmin","admin"]),productController.getProduct);

//TYPE API
userRouter.post('/api/types/', checkUserRole(["superadmin","admin"]),typeController.addType);
userRouter.patch('/api/types/update/:id', checkUserRole(["superadmin","admin"]),typeController.updateType);

//PRICE API
userRouter.post('/api/price/', checkUserRole(["superadmin","admin"]),priceController.addPrice);
userRouter.patch('/api/price/update/:id', checkUserRole(["superadmin","admin"]),priceController.updatePrice);

//MEJA API
userRouter.post('/api/meja/', checkUserRole(["superadmin","admin"]),mejaController.addMeja);
userRouter.patch('/api/meja/update/:id', checkUserRole(["superadmin","admin"]),mejaController.updateMeja);
userRouter.get('/api/meja/', checkUserRole(["superadmin","admin"]),mejaController.getMeja);


export {
    userRouter,
}
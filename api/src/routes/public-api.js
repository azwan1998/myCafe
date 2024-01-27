import express from "express";
import userController from "../controller/user-controller.js";
import menuController from "../controller/menu-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users/login", userController.login);
publicRouter.get("/api/menu/", menuController.showMenu);

export {
    publicRouter
}
import { ResponseError } from "../error/response-error.js";
import menuService from "../service/menu-service.js";

const addMenu = async (req, res, next) => {
  try {
    const request = {
      id_cafe: req.body.id_cafe,
      menu: req.body.menu,
    };

    const result = await menuService.addMenu(request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const request = {
      id: req.params.id,
      menu: req.body.menu,
    };

    const result = await menuService.updateMenu(request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const showMenu = async (req, res, next) => {
  try {
    const request = {
      id_cafe: parseInt(req.query.id_cafe),
      menu: req.query.menu,
    };

    const result = await menuService.showMenu(request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const request = {
        id: req.params.id
    };

    const result = await menuService.deleteMenu(request);

    res.status(204).json(result);
  } catch (e) {
    next(e);
  }
};

export default {
  addMenu,
  updateMenu,
  showMenu,
  deleteMenu,
};

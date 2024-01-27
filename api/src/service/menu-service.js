import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  addMenuValidation,
  daleteMenuValidation,
  showMenuValidation,
  updateMenuValidation,
} from "../validation/menu-validation.js";
import { validate } from "../validation/validation.js";

const addMenu = async (request) => {
  const menuData = validate(addMenuValidation, request);

  const checkMenu = await prismaClient.menu.count({
    where: {
      menu: menuData.menu,
    },
  });

  if (checkMenu !== 0) {
    throw new ResponseError(400, "Menu Already exist at you cafe");
  }

  return prismaClient.menu.create({
    data: menuData,
    select: {
      id: true,
      menu: true,
      id_cafe: true,
      created_at: true,
      updated_at: true,
    },
  });
};

const updateMenu = async (request) => {
  const menuData = validate(updateMenuValidation, request);

  const checkMenu = await prismaClient.menu.count({
    where: {
      id: menuData.id,
    },
  });

  if (checkMenu !== 1) {
    throw new ResponseError(400, "Menu not found");
  }

  return prismaClient.menu.update({
    where: {
      id: menuData.id,
    },
    data: {
      menu: menuData.menu,
    },
  });
};

const showMenu = async (request) => {
  const menuData = validate(showMenuValidation, request);

  const skip = (menuData.page - 1) * menuData.size;

  const filters = [];

  if (request.menu) {
    filters.push({
      menu: {
        contains: request.menu,
      },
    });
  }

  const menus = await prismaClient.menu.findMany({
    where: {
      AND: filters,
    },
    take: menuData.size,
    skip: skip,
    select: {
      id: true,
      menu: true,
      created_at: true,
      updated_at: true,
    },
  });

  const totalItems = await prismaClient.menu.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: menus,
    paging: {
      page: menuData.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / menuData.size),
    },
  };
};

const deleteMenu = async (request) => {
    const menuData = validate(daleteMenuValidation, request);

    const checkMenu = await prismaClient.menu.count({
        where: {
            id: menuData.id
        },
    });

    if(checkMenu !== 1){
        throw new ResponseError(400, "Menu not found");
    }

    return prismaClient.menu.delete({
        where: {
            id: menuData.id
        }
    });
}

export default {
  addMenu,
  updateMenu,
  showMenu,
  deleteMenu,
};

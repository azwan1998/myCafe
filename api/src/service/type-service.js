import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
  addTypeValidation,
  updateTypeValidation,
  getIdTypeValidation,
} from "../validation/type-validation.js";

const addType = async (request) => {
  const typeData = validate(addTypeValidation, request);

  const checkData = await prismaClient.type.count({
    where: {
      type: typeData.type,
    },
  });

  if (checkData !== 0) {
    throw new ResponseError(400, "Type Already exist at your cafe");
  }

  return prismaClient.type.create({
    data: typeData,
    select: {
      id: true,
      type: true,
      created_at: true,
      updated_at: true,
    },
  });
};

const updateType = async (request) => {
  const typeData = validate(updateTypeValidation, request);

  const checkData = await prismaClient.type.count({
    where: {
      id: typeData.id,
    },
  });

  if (checkData == 0) {
    throw new ResponseError(404, "Type Not Found");
  }

  return prismaClient.type.update({
    where: {
      id: typeData.id,
    },
    data: {
      type: typeData.type,
    },
  });
};

export default {
  addType,
  updateType,
};

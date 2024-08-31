import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
  addMejaValidation,
  getMejaValidation,
  idMejaValidation,
  updateMejaValidation,
} from "../validation/meja-validation.js";

const addMeja = async (request) => {
  const mejaData = validate(addMejaValidation, request);

  const checkMeja = await prismaClient.meja.count({
    where: {
      noMeja: mejaData.noMeja,
      id_cafe: mejaData.id_cafe,
    },
  });

  if (checkMeja !== 0) {
    throw new ResponseError(400, "Meja Already exist at your cafe");
  }

  return prismaClient.meja.create({
    data: mejaData,
    select: {
      id: true,
      noMeja: true,
      statusMeja: true,
      cafe: {
        select: {
          id: true,
          name: true,
        },
      },
      created_at: true,
      updated_at: true,
    },
  });
};

const updateMeja = async (request) => {
  const mejaData = validate(updateMejaValidation, request);

  const checkMeja = await prismaClient.meja.count({
    where: {
      id: mejaData.id,
    },
  });

  if (checkMeja !== 1) {
    throw new ResponseError(404, "Meja Not Found");
  }

  return prismaClient.meja.update({
    where: {
      id: mejaData.id,
    },
    data: {
      noMeja: mejaData.noMeja,
      statusMeja: mejaData.statusMeja,
    },
    select: {
      id: true,
      noMeja: true,
      statusMeja: true,
      cafe: {
        select: {
          id: true,
          name: true,
        },
      },
      created_at: true,
      updated_at: true,
    },
  });
};

const getMeja = async (request) => {
  const mejaData = validate(getMejaValidation, request);

  const skip = (mejaData.page - 1) * mejaData.size;

  const filters = [];

  if (request.noMeja) {
    filters.push({
      noMeja: {
        contains: request.noMeja,
      },
    });
  }

  if (request.statusMeja) {
    filters.push({
      statusMeja: request.statusMeja,
    });
  }

  if (request.id_cafe) {
    filters.push({
      id_cafe: {
        equals: request.id_cafe,
      },
    });
  }

  const mejas = await prismaClient.meja.findMany({
    where: {
      AND: filters,
    },
    take: mejaData.size,
    skip: skip,
    select: {
      id: true,
      noMeja: true,
      statusMeja: true,
      cafe: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const totalItems = await prismaClient.meja.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: mejas,
    paging: {
      page: mejaData.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / mejaData.size),
    },
  };
};

export default {
  addMeja,
  updateMeja,
  getMeja
};

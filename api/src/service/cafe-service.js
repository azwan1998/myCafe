import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
  addCafeValidation,
  deleteCafeValidation,
  showCafeValidation,
  updateCafeValidation,
} from "../validation/cafe-validation.js";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/cafes");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const uploadCafeFoto = multer({ storage: storage });

const addCafe = async (request) => {
  const cafeData = validate(addCafeValidation, request);

  const checkCafe = await prismaClient.cafe.count({
    where: {
      name: cafeData.name,
    },
  });

  if (checkCafe === 1) {
    throw new ResponseError(400, "Cafe already exists");
  }

  return prismaClient.cafe.create({
    data: cafeData,
    select: {
      id: true,
      name: true,
      longitude: true,
      latitude: true,
      alamat: true,
      foto: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const updateCafe = async (request) => {
  const cafeData = validate(updateCafeValidation, request);

  const checkCafe = await prismaClient.cafe.findFirst({
    where: {
      id: cafeData.id,
    },
  });

  if (!checkCafe) {
    throw new ResponseError(400, "Cafe not Found");
  }

  const result = await prismaClient.cafe.update({
    where: {
      id: cafeData.id,
    },
    data: {
      name: cafeData.name,
      longitude: cafeData.longitude,
      latitude: cafeData.latitude,
      alamat: cafeData.alamat,
      foto: request.foto !== undefined ? request.foto : checkCafe.foto,
    },
  });

  if (request.foto !== undefined && checkCafe.foto !== null) {
    const oldfotoPath = path.join(
      process.cwd(),
      "public/uploads/cafes",
      checkCafe.foto
    );

    await fs.unlink(oldfotoPath);
  }

  return result;
};

const showCafe = async (request) => {
  const userData = validate(showCafeValidation, request);

  const { page = 1, size = 10 } = userData;

  const skip = (page - 1) * size;

  const filters = [];

  console.log(userData);

  if (userData.role === "superadmin") {
    if (request.name) {
      filters.push({
        name: {
          contains: request.name,
        },
      });
    }

    if (request.alamat) {
      filters.push({
        username: {
          contains: request.alamat,
        },
      });
    }
  } else {
    filters.push({
      id_user: {
        equals: request.id_user,
      },
    });
  }

  const cafes = await prismaClient.cafe.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
    select: {
      id: true,
      name: true,
      longitude: true,
      latitude: true,
      alamat: true,
      foto: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  cafes.forEach((cafe) => {
    if (cafe.foto) {
      cafe.foto = `${process.env.BASE_URL}/uploads/cafes/${cafe.foto}`;
    }
  });

  const totalItems = await prismaClient.cafe.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: cafes,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const deleteCafe = async (request) => {
  const cafeData = validate(deleteCafeValidation, request);

  const checkCafe = await prismaClient.cafe.count({
    where: {
      id: cafeData.id,
    }
  });

  if(!checkCafe) {
    throw new ResponseError(400, "Cafe not Found");
  }

  return prismaClient.cafe.delete({
    where: {
      id: cafeData.id,
    },
  });
}

export { uploadCafeFoto };
export default {
  addCafe,
  updateCafe,
  showCafe,
  deleteCafe,
};

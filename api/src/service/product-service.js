import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  addProductValidaton,
  getIdProductValidaton,
  likeProductValidaton,
  updateProductValidaton,
} from "../validation/product-validation.js";
import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { request } from "http";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const uploadProductFoto = multer({ storage: storage });

const addProduct = async (request) => {
  const productData = validate(addProductValidaton, request);

  const checkProduct = await prismaClient.product.count({
    where: {
      productName: productData.productName,
    },
  });

  if (checkProduct !== 0) {
    throw new ResponseError(400, "Product Already Exists");
  }

  return prismaClient.product.create({
    data: productData,
    select: {
      id: true,
      id_menu: true,
      productName: true,
      foto: true,
      newProduct: true,
      hardSelling: true,
      mainProduct: true,
      totalLike: true,
      totalOrder: true,
      created_at: true,
      updated_at: true,
    },
  });
};

const updateProduct = async (request) => {
  const productData = validate(updateProductValidaton, request);

  const checkProduct = await prismaClient.product.findFirst({
    where: {
      id: productData.id,
    },
    select: {
      id: true,
      productName: true,
      foto: true,
    },
  });

  if (!checkProduct) {
    throw new ResponseError(400, "Product not Found");
  }

  const result = await prismaClient.product.update({
    where: {
      id: productData.id,
    },
    data: {
      id_menu: productData.id_menu,
      productName: productData.productName,
      newProduct: productData.newProduct,
      mainProduct: productData.mainProduct,
      hardSelling: productData.hardSelling,
      foto: request.foto !== undefined ? request.foto : checkProduct.foto,
    },
  });

  if (request.foto !== undefined && checkProduct.foto !== null) {
    const oldfotoPath = path.join(
      process.cwd(),
      "public/uploads/products",
      checkProduct.foto
    );

    await fs.unlink(oldfotoPath);
  }

  return result;
};

const deleteProduct = async (request) => {
  const productData = validate(getIdProductValidaton, request);

  const checkProduct = await prismaClient.product.findFirst({
    where: {
      id: productData.id,
    },
    select: {
      id: true,
      foto: true,
    },
  });

  if (!checkProduct) {
    throw new ResponseError(400, "Product Not Found");
  }

  if (checkProduct.foto !== null) {
    const oldfotoPath = path.join(
      process.cwd(),
      "public/uploads/products",
      checkProduct.foto
    );

    await fs.unlink(oldfotoPath);
  }

  return prismaClient.product.delete({
    where: {
      id: productData.id,
    },
  });
};

const likeProduct = async (request) => {
  const productData = validate(likeProductValidaton, request);

  const checkProduct = await prismaClient.product.findFirst({
    where: {
      id: productData.id,
    },
    select: {
      id: true,
      totalLike: true,
    },
  });

  const checkHistory = await prismaClient.historyLike.findFirst({
    where: {
      email: productData.email,
      id_product: productData.id,
    },
    select: {
      id: true,
      email: true,
      id_product: true,
    },
  });

  if (!checkHistory) {
    await prismaClient.product.update({
      where: {
        id: productData.id,
      },
      data: {
        totalLike: checkProduct.totalLike + 1,
      },
    });

    return prismaClient.historyLike.create({
      data: {
        email: productData.email,
        id_product: productData.id,
      },
    });
  } else {
    await prismaClient.product.update({
      where: {
        id: productData.id,
      },
      data: {
        totalLike: checkProduct.totalLike - 1,
      },
    });

    return prismaClient.historyLike.delete({
      where: {
        id: checkHistory.id,
      },
    });
  }
};

export { uploadProductFoto };
export default {
  addProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
};

import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  addProductValidaton,
  getIdProductValidaton,
  getProductValidaton,
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

const getProduct = async (request) => {
  const productData = validate(getProductValidaton, request);

  console.log(productData);
  const skip = (productData.page - 1) * productData.size;

  const filters = [];

  filters.push({
    menu: {
      is: {
        id_cafe: productData.id_cafe, // Ubah ke id_cafe sesuai kebutuhan
      },
    },
  });

  if (request.id_menu) {
    filters.push({
      id_menu: {
        equals: parseInt(request.id_menu),
      },
    });
  }

  if (request.productName) {
    filters.push({
      productName: {
        contains: request.productName,
      },
    });
  }

  if (request.newProduct) {
    filters.push({
      newProduct: {
        equals: request.newProduct === 'true' ? true : false,
      },
    });
  }

  if (request.hardSelling) {
    filters.push({
      hardSelling: {
        equals: request.hardSelling === 'true' ? true : false,
      },
    });
  }

  if (request.mainProduct) {
    filters.push({
      mainProduct: {
        equals: request.mainProduct === 'true' ? true : false,
      },
    });
  }

  const products = await prismaClient.product.findMany({
    where: {
      AND: filters,
    },
    take: productData.size,
    skip: skip,
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
      menu: {
        select: {
          id: true,
          menu: true,
        },
      },
    },
  });

  products.forEach((product) => {
    if (product.foto) {
      product.foto = `${process.env.BASE_URL}/uploads/products/${product.foto}`;
    }
  });

  const totalItems = await prismaClient.product.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: products,
    paging: {
      page: productData.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / productData.size),
    },
  };
};

const getProductPublic = async (request) => {
  
}

export { uploadProductFoto };
export default {
  addProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
  getProduct,
  getProductPublic,
};

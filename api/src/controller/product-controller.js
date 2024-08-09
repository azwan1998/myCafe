import { ResponseError } from "../error/response-error.js";
import productService from "../service/product-service.js";
import { uploadProductFoto } from "../service/product-service.js";

const addProduct = async (req, res, next) => {
  try {
    uploadProductFoto.single("foto")(req, res, (err) => {
      if (err) {
        return next(new ResponseError(400, err.message));
      }

      const request = {
        id_menu: parseInt(req.body.id_menu),
        productName: req.body.productName,
        newProduct: req.body.newProduct === "true" ? true : false,
        hardSelling: req.body.hardSelling === "true" ? true : false,
        mainProduct: req.body.mainProduct === "true" ? true : false,
        foto: req.file ? req.file.filename : undefined,
      };

      productService
        .addProduct(request)
        .then((result) => {
          res.status(200).json({ data: result });
        })
        .catch((error) => {
          next(error);
        });
    });
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    uploadProductFoto.single("foto")(req, res, (err) => {
      if (err) {
        return next(new ResponseError(400, err.message));
      }

      const request = {
        id: req.params.id,
        id_menu:
          req.body.id_menu !== undefined
            ? parseInt(req.body.id_menu)
            : req.body.id_menu,
        productName: req.body.productName,
        newProduct: req.body.newProduct === "true" ? true : false,
        hardSelling: req.body.hardSelling === "true" ? true : false,
        mainProduct: req.body.mainProduct === "true" ? true : false,
        foto: req.file ? req.file.filename : undefined,
      };

      productService
        .updateProduct(request)
        .then((result) => {
          res.status(201).json({ data: result });
        })
        .catch((error) => {
          next(error);
        });
    });
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const request = {
      id: req.params.id,
    };

    const result = await productService.deleteProduct(request);

    res.status(204).json(result);
  } catch (e) {
    next(e);
  }
};

const likeProduct = async (req, res, next) => {
  try {
    const request = {
      id: req.params.id,
      email: req.body.email,
    };

    const result = await productService.likeProduct(request);

    res.status(204).json(result);
  } catch (e) {
    next(e);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const request = {
      id_cafe: parseInt(req.query.id_cafe),
      id_menu: req.query.id_menu,
      newProduct: req.query.newProduct,
      hardSelling: req.query.hardSelling,
      mainProduct: req.query.mainProduct,
      productName: req.query.productName,
    };

    const result  = await productService.getProduct(request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default {
  addProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
  getProduct,
};

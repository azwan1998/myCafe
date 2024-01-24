import cafeService from "../service/cafe-service.js";
import { uploadCafeFoto } from "../service/cafe-service.js";
import { ResponseError } from "../error/response-error.js";

const addCafe = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    uploadCafeFoto.single("foto")(req, res, (err) => {
      if (err) {
        return next(new ResponseError(400, err.message));
      }

      const request = {
        id_user: userId,
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        alamat: req.body.alamat,
        foto: req.file ? req.file.filename : undefined,
      };

      cafeService
        .addCafe(request)
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

const updateCafe = async (req, res, next) => {
  try {
    const cafeId = req.params.id;

    uploadCafeFoto.single("foto")(req, res, (err) => {
      if (err) {
        return next(new ResponseError(400, err.message));
      }

      const request = {
        id: cafeId,
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        alamat: req.body.alamat,
        foto: req.file ? req.file.filename : undefined,
      };

      cafeService
        .updateCafe(request)
        .then((result) => {
          res.status(200).json({ data: result });
        })
        .catch((error) => {
          next(error);
        });
    });

    // const result = await cafeService.updateCafe(request);

    // res.status(200).json({
    //   data: result
    // });
  } catch (e) {
    next(e);
  }
};

const showCafe = async (req, res, next) => {
  try {
    const request = {
      name: req.query.name,
      alamat: req.query.alamat,
      role: req.user.role,
      id_user: req.user.userId,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await cafeService.showCafe(request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const deleteCafe = async (req, res, next) => {
  const request = {
    id: req.params.id,
  };

  const result = await cafeService.deleteCafe(request);

  res.status(204).json(result);
}

export default {
  addCafe,
  updateCafe,
  showCafe,
  deleteCafe,
};

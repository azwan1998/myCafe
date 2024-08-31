import cafeService from "../service/cafe-service.js";
import mejaService from "../service/meja-service.js";

const addMeja = async (req, res, next) => {
  try {
    const requestCafe = {
      id_user: req.user.userId,
      role: req.user.role,
    };

    const cafeData = await cafeService.showCafe(requestCafe);

    const requestMeja = {
      id_cafe: cafeData.data[0].id,
      noMeja: req.body.noMeja,
      statusMeja: req.body.statusMeja,
    };

    const result = await mejaService.addMeja(requestMeja);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateMeja = async (req, res, next) => {
  try {
    const request = {
      id: req.params.id,
      noMeja: req.body.noMeja,
      statusMeja: req.body.statusMeja,
    };

    const result = await mejaService.updateMeja(request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const getMeja = async (req, res, next) => {
  try {
    const requestCafe = {
      id_user: req.user.userId,
      role: req.user.role,
    };

    const cafeData = await cafeService.showCafe(requestCafe);

    const requestMeja = {
      id_cafe: cafeData.data[0].id,
      noMeja: req.query.noMeja,
      statusMeja: req.query.statusMeja,
    };

    const result = await mejaService.getMeja(requestMeja);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default { addMeja, updateMeja, getMeja };

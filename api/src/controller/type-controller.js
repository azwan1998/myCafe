import typeService from "../service/type-service.js";

const addType = async (req, res, next) => {
  try {
    const request = {
      type: req.body.type,
    };

    const result = await typeService.addType(request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateType = async (req, res, next) => {
  try {
    const request = {
      id: req.params.id,
      type: req.body.type,
    };

    const result = await typeService.updateType(request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export default {
  addType,
  updateType,
};

import Joi from "joi";

const addMejaValidation = Joi.object({
    id_cafe: Joi.number().positive().required(),
    noMeja: Joi.string().max(100).required(),
    statusMeja: Joi.string().valid('available', 'cleaning', 'in_use', 'reserved', 'not_available').required(),
});

const updateMejaValidation = Joi.object({
    id: Joi.number().positive().required(),
    noMeja: Joi.string().max(100).required(),
    statusMeja: Joi.string().valid('available', 'cleaning', 'in_use', 'reserved', 'not_available').required(),
});

const idMejaValidation = Joi.object({
    id: Joi.number().positive().required(),
});

const getMejaValidation = Joi.object({
    id_cafe: Joi.number().positive().required(),
    noMeja: Joi.string().max(100).optional(),
    statusMeja: Joi.string().valid('available', 'cleaning', 'in_use', 'reserved', 'not_available').optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
});

export {
    addMejaValidation,
    updateMejaValidation,
    idMejaValidation,
    getMejaValidation
}





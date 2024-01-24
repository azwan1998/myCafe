import Joi from "joi";

const addCafeValidation = Joi.object({
    id_user: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    longitude: Joi.number().precision(6).required(), 
    latitude: Joi.number().precision(6).required(),
    alamat: Joi.string().optional(),
    foto: Joi.string().optional(),
});

const updateCafeValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    longitude: Joi.number().precision(6).required(), 
    latitude: Joi.number().precision(6).required(),
    alamat: Joi.string().optional(),
    foto: Joi.string().optional(),
});

const showCafeValidation = Joi.object({
    id_user: Joi.number().positive().required(),
    role: Joi.string().required(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    alamat: Joi.string().optional(),
});

const deleteCafeValidation = Joi.object({
    id: Joi.number().positive().required(),
})

export {
    addCafeValidation,
    updateCafeValidation,
    showCafeValidation,
    deleteCafeValidation,
}
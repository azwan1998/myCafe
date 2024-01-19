import Joi from "joi";

const addProfileValidaton = Joi.object({
    id_user: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().email({ tlds: { allow: false } }).max(100).optional(),
    phone: Joi.string().max(100).optional(),
    alamat: Joi.string().optional(),
    foto: Joi.string().optional(), // Validasi untuk foto
});

const showProfileValidation = Joi.object({
    id_user: Joi.number().positive().required(),
});

export {
    addProfileValidaton,
    showProfileValidation,
}
import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    role: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const isActiveUserValidation = Joi.object({
    id: Joi.number().positive().required(),
    isActive: Joi.boolean().required(),
});

const getIdUserValidation = Joi.object({
    id: Joi.number().positive().required(),
});

const listUserValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    role: Joi.string().max(100).optional(),
    isActive: Joi.boolean().optional(),
    username: Joi.string().optional(),
});

const passwordUserValidation = Joi.object({
    id: Joi.number().positive().required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).min(6).required(),
});

export {
    registerUserValidation,
    loginUserValidation,
    isActiveUserValidation,
    getIdUserValidation,
    listUserValidation,
    passwordUserValidation
}
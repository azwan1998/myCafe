import Joi from "joi";

const addMenuValidation = Joi.object({
    id_cafe: Joi.number().positive().required(),
    menu: Joi.string().max(100).required(),
});

const updateMenuValidation = Joi.object({
    id: Joi.number().positive().required(),
    menu: Joi.string().max(100).required(),
});

const showMenuValidation = Joi.object({
    id_cafe: Joi.number().positive().required(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    menu: Joi.string().max(100).optional(),
});

const daleteMenuValidation = Joi.object({
    id: Joi.number().positive().required(),
});

export {
    addMenuValidation,
    updateMenuValidation,
    showMenuValidation,
    daleteMenuValidation,
}
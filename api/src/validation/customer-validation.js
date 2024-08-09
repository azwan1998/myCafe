import Joi from "joi";

const addCustomerValidation = Joi.object({
    id_cafe: Joi.number().positive().required(),
    customer: Joi.string().max(100).required(),
});

const updateCustomerValidation = Joi.object({
    id: Joi.number().positive().required(),
    customer: Joi.string().max(100).required(),
});

const showCustomerValidation = Joi.object({
    id_cafe: Joi.number().positive().required(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    customer: Joi.string().max(100).optional(),
});

const daleteCustomerValidation = Joi.object({
    id: Joi.number().positive().required(),
});

export {
    addCustomerValidation,
    updateCustomerValidation,
    showCustomerValidation,
    daleteCustomerValidation,
}
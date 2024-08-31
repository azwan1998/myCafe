import Joi from "joi";

const addPriceValidation = Joi.object({
    price: Joi.number().positive().required(),
    id_product :Joi.number().positive().required(),
    id_type :Joi.number().positive().required(),
});

const updatePriceValidation = Joi.object({
    id :Joi.number().positive().required(),
    price: Joi.number().positive().required(),
    id_type :Joi.number().positive().required(),
});

const idPriceValidation = Joi.object({
    id :Joi.number().positive().required(),
});

const getPriceValidation = Joi.object({
    id_product :Joi.number().positive().optional(),
    id_type :Joi.number().positive().optional(),
    id :Joi.number().positive().optional(),
});


export {
    addPriceValidation,
    updatePriceValidation,
    idPriceValidation,
    getPriceValidation
}
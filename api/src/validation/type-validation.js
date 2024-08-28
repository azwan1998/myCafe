import Joi from "joi";

const addTypeValidation = Joi.object({
    type: Joi.string().max(100).required(),
});

const getIdTypeValidation = Joi.object({
    id: Joi.number().positive().required(),
});

const updateTypeValidation = Joi.object({
    id: Joi.number().positive().required(),
    type: Joi.string().max(100).required(),
});

export {
    addTypeValidation,
    getIdTypeValidation,
    updateTypeValidation
}

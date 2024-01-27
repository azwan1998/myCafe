import Joi from "joi";

const addProductValidaton = Joi.object({
    id_menu: Joi.number().positive().required(),
    productName: Joi.string().max(100).required(),
    newProduct: Joi.boolean().default(false).optional(),
    hardSelling: Joi.boolean().default(false).optional(),
    mainProduct: Joi.boolean().default(false).optional(),
    foto: Joi.string().optional(),
    totalLike: Joi.number().default(0),
    totalOrder: Joi.number().default(0),
});

const updateProductValidaton = Joi.object({
    id: Joi.number().positive().required(),
    id_menu: Joi.number().positive().optional(),
    productName: Joi.string().max(100).optional(),
    newProduct: Joi.boolean().optional(),
    hardSelling: Joi.boolean().optional(),
    mainProduct: Joi.boolean().optional(),
    foto: Joi.string().optional(),
});

const getProductValidaton = Joi.object({
    id_cafe: Joi.number().positive().required(),
    id_menu: Joi.number().positive().optional(),
    productName: Joi.string().max(100).optional(),
    newProduct: Joi.boolean().optional(),
    hardSelling: Joi.boolean().optional(),
    mainProduct: Joi.string().optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
});

const getIdProductValidaton = Joi.object({
    id: Joi.number().positive().required(),
    newProduct: Joi.boolean().default(false).optional(),
    hardSelling: Joi.boolean().default(false).optional(),
    mainProduct: Joi.string().default(false).optional(),
});

const likeProductValidaton = Joi.object({
    id: Joi.number().positive().required(),
    email: Joi.string().max(100).required(),
});


export {
    addProductValidaton,
    updateProductValidaton,
    getProductValidaton,
    getIdProductValidaton,
    likeProductValidaton,
}
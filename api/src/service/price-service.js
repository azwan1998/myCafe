import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { addPriceValidation, updatePriceValidation, idPriceValidation, getPriceValidation } from "../validation/price-validation.js";

const addPrice = async (request) => {
    const priceData = validate(addPriceValidation, request);
  
    const result = await prismaClient.price.create({
        data: {
            price: priceData.price,
            type: {
              connect: { id: priceData.id_type }, 
            },
            product: {
              connect: { id: priceData.id_product },
            },
          },
      select: {
        id: true,
        price: true,
        created_at: true,
        updated_at: true,
        type: {
            select: {
              id: true, 
              type: true
            },
          },
          product: {
            select: {
              id: true, 
              productName: true
            },
          },
      },
    });

    return result;
  };

  export default {
    addPrice
  }


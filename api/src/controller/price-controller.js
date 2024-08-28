import priceService from "../service/price-service.js"

const addPrice = async (req, res, next) => {
    try {
        const request = {
            id_type: req.body.id_type,
            id_product: req.body.id_product,
            price: req.body.price
        }

        const result = await priceService.addPrice(request);

        res.status(201).json(result);
    } catch (e) {
        next(e)
    };
};

export default {
    addPrice
}
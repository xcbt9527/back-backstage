/**
 * Created by momo on 2018/1/8.
 */
import express from "express";
import cart from "../Controller/cart/cart";
let router = express.Router();
router.post('/getAllCart', (req, res, next) => {
    cart.getAllCart(req, res, next);
});
router.post('/getCart', (req, res, next) => {
    cart.getCart(req, res, next);
});
router.post('/DelectCart', (req, res, next) => {
    cart.DelectCart(req, res, next);
});
router.post('/SaveCart', (req, res, next) => {
    cart.SaveCart(req, res, next);
});
module.exports = router;

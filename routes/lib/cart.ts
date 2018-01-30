/**
 * Created by momo on 2018/1/8.
 */
import express from "express";
import cart from "../../Controller/cart/cart";
let router = express.Router();
router.post('/getAllCart', (req, res, next) => {
    cart.getAll(req, res, next);
});
router.post('/getCart', (req, res, next) => {
    cart.getOne(req, res, next);
});
router.post('/Delect', (req, res, next) => {
    cart.DelectCart(req, res, next);
});
router.post('/Save', (req, res, next) => {
    cart.Save(req, res, next);
});
module.exports = router;

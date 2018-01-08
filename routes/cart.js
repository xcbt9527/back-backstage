/**
 * Created by momo on 2018/1/8.
 */
import express from "express";
import user from "../Controller/cart/cart";
let router = express.Router();
router.post('/getAllCart', (req, res, next) => {
    user.getAllCart(req, res, next);
});
router.post('/getCart', (req, res, next) => {
    user.getCart(req, res, next);
});
router.post('/DelectCart', (req, res, next) => {
    user.DelectCart(req, res, next);
});
router.post('/SaveCart', (req, res, next) => {
    user.SaveCart(req, res, next);
});
module.exports = router;

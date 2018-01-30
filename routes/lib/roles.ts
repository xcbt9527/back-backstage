/**
 * Created by momo on 2018/1/21.
 */
import express from "express";
import {rolesclass} from "../../Controller/roles/roles";
const roles = new rolesclass();
let router = express.Router();
router.post('/getAllroles', (req, res, next) => {
    roles.getAll(req, res, next);
});

router.post('/getTreeroles', (req, res, next) => {
    roles.getTree(req, res, next);
});
router.post('/getroles', (req, res, next) => {
    roles.getOne(req, res, next);
});
router.post('/Delectroles', (req, res, next) => {
    roles.Delect(req, res, next);
});
router.post('/Saveroles', (req, res, next) => {
    roles.Save(req, res, next);
});
module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post('/', userController_1.newUser);
router.post('/login', userController_1.loginUser);
exports.default = router;

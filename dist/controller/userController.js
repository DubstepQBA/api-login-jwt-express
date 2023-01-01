"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    //Validaciones
    const user = yield userModel_1.User.findOne({ where: { username: username } });
    if (user) {
        res.status(400).json({
            msg: "El usuario que intenta registrar ya se encuentra en uso",
        });
    }
    else {
        try {
            yield userModel_1.User.create({
                username: username,
                password: hashPassword
            });
            res.json({
                msg: `Usuario ${username} creado con exito`,
            });
        }
        catch (error) {
            res.status(400).json({
                msg: "Upps ocurrio un error",
                error
            });
        }
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //validacion del user en la db
    const user = yield userModel_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: "No existe un usuario con ese username ",
        });
    }
    // validacion de la  password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Password es incorrecta",
        });
    }
    //general token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'K8x3xFSasjbt3@xR');
    res.json(token);
});
exports.loginUser = loginUser;

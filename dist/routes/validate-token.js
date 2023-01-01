"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Validacion de Token
const validateToken = (req, res, next) => {
    const headertoken = req.headers['authorization'];
    if (headertoken != undefined && headertoken.startsWith('Bearer ')) {
        try {
            //tiene token
            const bearerToken = headertoken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'K8x3xFSasjbt3@xR');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: "Token no Valido o Expirado"
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Inicie session para tener accesos '
        });
    }
};
exports.default = validateToken;

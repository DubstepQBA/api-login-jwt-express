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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productRoute_1 = __importDefault(require("../routes/productRoute"));
const userRoute_1 = __importDefault(require("../routes/userRoute"));
const productModel_1 = require("./productModel");
const userModel_1 = require("./userModel");
class Server {
    constructor() {
        // Inicializando las variables en el contructor
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    //Metodo de escucha Listen
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port);
        });
    }
    //Rutas
    routes() {
        this.app.use('/api/products', productRoute_1.default);
        this.app.use('/api/users', userRoute_1.default);
    }
    midlewares() {
        //parseo del body
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productModel_1.Product.sync();
                yield userModel_1.User.sync();
            }
            catch (error) {
                console.error('Unable to connect to db');
            }
        });
    }
}
exports.default = Server;

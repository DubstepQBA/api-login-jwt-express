"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoute_1 = __importDefault(require("../routes/productRoute"));
const userRoute_1 = __importDefault(require("../routes/userRoute"));
class Server {
    constructor() {
        // Inicializando las variables en el contructor
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
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
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;

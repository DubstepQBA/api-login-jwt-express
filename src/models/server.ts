import express, { Application} from 'express';
import cors from 'cors';
import routesProduct from "../routes/productRoute";
import routesUser from "../routes/userRoute";
import {Product} from "./productModel";
import {User} from "./userModel";
class Server {
   
    //Variables del servidor

    private app:Application;
    private port: String;
    
    constructor(){
       // Inicializando las variables en el contructor

            this.app = express();
            this.port = process.env.PORT || '3001';
            this.listen();
            this.midlewares();
            this.routes();
            this.dbConnect()
          
    }

    //Metodo de escucha Listen
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto: '+ this.port)
        })
    }

    //Rutas
    routes(){
        this.app.use('/api/products',routesProduct);
        this.app.use('/api/users', routesUser);
    }

    midlewares(){
        //parseo del body
        this.app.use(express.json());
        //Cors
        this.app.use(cors())
    }

    async dbConnect(){
        try {
            await Product.sync();
            await User.sync();
        }catch (error){
            console.error('Unable to connect to db')
        }
    }
}
export default Server;  
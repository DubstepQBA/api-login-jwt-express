import {json, NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

// Validacion de Token
const validateToken = (req:Request, res:Response , next:NextFunction)=>{

    const headertoken = req.headers['authorization'];

    if (headertoken != undefined && headertoken.startsWith('Bearer ')){
        try {
            //tiene token
            const bearerToken = headertoken.slice(7);
            jwt.verify(bearerToken,process.env.SECRET_KEY|| 'K8x3xFSasjbt3@xR')
            next();
        }catch (error) {
            res.status(401).json({
                msg: "Token no Valido o Expirado"
            })
        }
    }else {
        res.status(401).json({
             msg:'Inicie session para tener accesos '
        })
    }

}

export default validateToken;
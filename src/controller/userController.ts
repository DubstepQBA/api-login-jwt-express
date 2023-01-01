import { Request,Response } from "express"
import bcrypt from 'bcrypt';
import {User} from "../models/userModel";
import jwt from "jsonwebtoken";


export const newUser = async (req:Request, res:Response)=>{

    const {username ,password} =req.body;
    const hashPassword =  await bcrypt.hash(password, 10);

    //Validaciones
    const user = await User.findOne({where:{username:username}});
    if (user){
        res.status(400).json({
            msg:"El usuario que intenta registrar ya se encuentra en uso",
          })
    }else {
        try {
            await  User.create({
                username: username,
                password: hashPassword
            })

            res.json({
                msg:`Usuario ${username} creado con exito`,

            })
        }catch (error){
            res.status(400).json({
                msg:"Upps ocurrio un error",
                error
            })
        }
    }
}

export const loginUser = async (req:Request, res:Response)=>{
   
  const {username , password} =req.body;

  //validacion del user en la db
    const user:any = await User.findOne({where:{username:username}});
    if(!user){
      return   res.status(400).json({
            msg:"No existe un usuario con ese username ",
        });
    }
    // validacion de la  password
   const passwordValid= await bcrypt.compare(password,user.password);
    if(!passwordValid){
        return   res.status(400).json({
            msg:"Password es incorrecta",
        });
    }

    //general token
   const token = jwt.sign({
        username:username
    },process.env.SECRET_KEY ||'K8x3xFSasjbt3@xR' );

    res.json(token);
}

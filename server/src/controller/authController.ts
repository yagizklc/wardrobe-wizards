import {Request, Response, NextFunction} from "express"
import User from "../models/user"
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


//@desc Signup for customer
//@route POST /signup
//@access public
const signUp = async (req: Request,res: Response)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = new User({
        email : req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        adress : req.body.adress,
        password : hashedPassword
    })

    const addedUser = await newUser.save()
    res.status(200).json({status: "success", userInfo: addedUser})

}

const login = async (req: Request,res: Response)=>{

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // Get user input
        const { email, password } = req.body;
    

        // Validate if user exist in our database
        const user = await User.findOne({ email });
      
    
    
        const comp = await bcrypt.compare(password, user!.password)
        const hashedpw = await bcrypt.hash(password, 10);
    
    
        console.log(
          `
          sentPassword: ${password}
          hashedpw: ${hashedpw}
          encryptedPassword: ${user!.password}
          comp: ${comp}
          `
        )
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY!,
            {expiresIn: "2h"}
          );
    
          console.log(" token: " + token + "")
    

    
          // user
          return res.status(200).json({token:token});
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }



}
export default {signUp, login}
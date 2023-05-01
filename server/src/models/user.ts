import { Schema, model, connect } from 'mongoose';

interface IUser{
    email:string,
    name: string,
    surname: string,
    adress:string
    password:string
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    adress: { type: String, required: true },
    password: { type: String, required: true },
  });
  
 export default model<IUser>('User', userSchema);


import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
   email: String,
   password: String,
});

userSchema.pre('save', async function(){
    //TODO: fix update user bug
    this.password = await bcryptjs.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
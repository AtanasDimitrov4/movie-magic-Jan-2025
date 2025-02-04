import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
   email: {
    type: String,
    unique: true, // This is not validator, it's index
    match: /\@[a-zA-Z]+.[a-zA-Z]+$/,
    minLength: 10,
   },
   password: {
    type: String,
    match: /^\w+$/,
    minLength: [6, 'Password should be at least 6 characters!']
   },
});

userSchema.pre('save', async function() {
    
    this.password = await bcryptjs.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
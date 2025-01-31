import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'csjje083.AYMeZCNubrbawZj2KOq1sdErtGYeWXTQYI69wvLBBAyTeUSQKq';

export default {
    register(userData) {
       return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });
       
        if(!user) {
            throw new Error('Invalid email or password!');
        }
       
        const isValid = await bcryptjs.compare(password, user.password);
        if(!isValid) {
            throw new Error('Invalid email or password!');
        }
       // Generate token
        const payload = {
            id: user._id,
            email: user.email
        };
        //TODO: use async option
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});

        return token;
    }
};
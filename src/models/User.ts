import {Schema, model, Document} from 'mongoose';

import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    fullname: {
        type: String,
        required:true,
        trim: true
    },
    username: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true
    },
    role: {
        type: String,
        default: 'user',
        trim: true
    },
    password: {
        type: String,
        required:true,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    }
}, {timestamps: true, versionKey: false});

export interface IUser extends Document{
    fullname: string;
    username: string;
    password: string;
    email: string;
    age: string;
    country: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);   
}

export default model<IUser>('User', userSchema);
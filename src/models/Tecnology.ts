import {Schema, model, Document} from 'mongoose';

const tecnologySchema = new Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    es_resume: {
        type: String,
        required:true,
        trim: true
    },
    en_resume: {
        type: String,
        required:true,
        trim: true
    },
    es_description: {
        type: String,
        required:true,
        trim: true
    },
    en_description: {
        type: String,
        required:true,
        trim: true
    },
    url: {
        type: String,
        required:true,
        trim: true
    },
    urlImage: {
        type: String,
        required:true,
        trim: true
    }
}, {timestamps: true, versionKey: false});

export interface ITecnology extends Document{
    name: string;
    es_resume: string;
    en_resume: string;
    es_description: string;
    en_description: string;
    url: string;
    urlImage: string;
}
export default model<ITecnology>('Tecnology', tecnologySchema);
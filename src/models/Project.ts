import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const projectSchema = new Schema({
    es_name: {
        type: String,
        required:true,
        trim: true
    },
    en_name: {
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
    tecnologies: [
        {
            type: ObjectId,
            ref: 'Tecnology'
        }
    ],
    imgUrls: {
        type: Array,
        required: true
    }

}, {timestamps: true, versionKey: false});

export interface IProject extends Document{
    es_name: string;
    en_name: string;
    es_description: string;
    en_description: string;
    tecnologies: [];
    imgUrls: [];
}

export default model<IProject>('Project', projectSchema);
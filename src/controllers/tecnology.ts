import {RequestHandler} from 'express';
import Project from '../models/Project';
import Tecnology, {ITecnology} from '../models/Tecnology';

//@Route    Post api/tecnology
//@desc     Create new tecnology
//@access   Public
export const createTecnology: RequestHandler = async (req, res) => {
    const {name, es_resume, es_description, en_resume, en_description, url, urlImage} = req.body;
    try {
        const tecnology: ITecnology = new Tecnology({
            name,
            es_resume,
            es_description,
            en_resume,
            en_description,
            url,
            urlImage
        });
        const tecnologySaved = await tecnology.save();
        return res.status(201).json({tecnologySaved});
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Get api/tecnology
//@desc     Get all tecnologies
//@access   Public
export const getTecnologies: RequestHandler = async (req, res) => {
    try {
        const tecnologies = await Tecnology.find();
        return res.status(200).json(tecnologies);
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Get api/tecnology/:id
//@Param    Id
//@desc     Get tecnology by id
//@access   Public
export const getTecnology: RequestHandler = async (req, res) => {
    try {
        const tecnologyById = await Tecnology.findById(req.params.id);
        return res.status(200).json({tecnologyById});
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Put api/tecnology/:id
//@Param    Id
//@desc     Update tecnology by id
//@access   Private
export const editTecnology: RequestHandler = async (req, res) => {
    const {name, es_resume, es_description, en_resume, en_description, url, urlImage} = req.body;
    try {
        const tecnologyDataToUpdate = ({
            name,
            es_resume,
            es_description,
            en_resume,
            en_description,
            url,
            urlImage
        });
        const tecnologyUpdated = await Tecnology.findByIdAndUpdate(req.params.id, tecnologyDataToUpdate, {new: true});
        return res.status(201).json({tecnologyUpdated});
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Delete api/tecnology/:id
//@Param    Id
//@desc     Delete tecnology by id
//@access   Private
export const deleteTecnology: RequestHandler = async (req, res) => {
    try {
        const tecnologyDeleted = await Tecnology.findByIdAndDelete(req.params.id);
        const projectDeleted = await Project.deleteMany({'tecnologies': {$elemMatch: {$in: req.params.id}}});
        return res.status(200).json({tecnologyDeleted});
    } catch (error) {
        return res.status(400).json({error});
    }
}
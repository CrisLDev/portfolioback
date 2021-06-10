import {RequestHandler} from 'express';
import Project, {IProject} from '../models/Project';

//@Route    Post api/tecnology
//@desc     Create new tecnology
//@access   Public
export const createProject: RequestHandler = async (req, res) => {
    /*const tecnologiesMapped:Array<String> = [];
    const tecnologiesToSave = req.body.tecnologies.map((tecnology:string)=> {
        tecnologiesMapped.push(tecnology.split("+")[0]);
    });*/
    const {es_name, en_name, es_description, en_description, imgUrls, tecnologies} = req.body;
    const urls: [String] = imgUrls.split(", ");
    try {
        const project: IProject = new Project({
            es_name, en_name, es_description, en_description, imgUrls:urls, tecnologies
        });
        const projectSaved = await project.save();
        console.log('hola')
        return res.status(201).json({projectSaved});
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Get api/project
//@desc     Get all projects
//@access   Public
export const getProjects: RequestHandler = async (req, res) => {
    try {
        const projects = await Project.find().populate('tecnologies');
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(400).json({error: "Server error"});
    }
}

//@Route    Get api/project/:id
//@Param    Id
//@desc     Get project by id
//@access   Public
export const getProject: RequestHandler = async (req, res) => {
    try {
        const projectById = await Project.findById(req.params.id);
        return res.status(200).json({projectById});
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Put api/project/:id
//@Param    Id
//@desc     Update project by id
//@access   Private
export const editProject: RequestHandler = async (req, res) => {
    const {es_name, en_name, es_description ,en_description, tecnologies, imgUrls,} = req.body;
    try {
        const projectDataToUpdate = ({
            es_name,
            en_name,
            es_description,
            en_description,
            tecnologies,
            imgUrls,
        });
        const projectUpdated = await Project.findByIdAndUpdate(req.params.id, projectDataToUpdate, {new: true});
        return res.status(201).json({projectUpdated});
    } catch (error) {
        return res.status(400).json({error});
    }
}

//@Route    Delete api/project/:id
//@Param    Id
//@desc     Delete project by id
//@access   Private
export const deleteProject: RequestHandler = async (req, res) => {
    try {
        const projectDeleted = await Project.findByIdAndDelete(req.params.id);
        return res.status(200).json({projectDeleted});
    } catch (error) {
        return res.status(400).json({error});
    }
}
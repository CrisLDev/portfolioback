import {Router} from 'express';

import {createProject, deleteProject, editProject, getProject, getProjects} from '../controllers/project';

const router = Router();

router.route('/project')
.post(createProject)
.get(getProjects);

router.route('/project/:id')
.get(getProject)
.put(editProject)
.delete(deleteProject);

export default router;
import {Router} from 'express';

import {createTecnology, deleteTecnology, editTecnology, getTecnologies, getTecnology} from '../controllers/tecnology';

const router = Router();

router.route('/tecnology')
.post(createTecnology)
.get(getTecnologies);

router.route('/tecnology/:id')
.get(getTecnology)
.put(editTecnology)
.delete(deleteTecnology);

export default router;
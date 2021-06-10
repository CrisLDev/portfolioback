import {Router} from 'express';
import { getMe, login, register } from '../controllers/auth';
import passport from 'passport';
/*import { token } from '../middlewares/passport';*/

const router = Router();

router.route('/users')
.post(register);

router.route('/auth')
.post(login)
.get(passport.authenticate("jwt", {session: false}), getMe);

export default router;
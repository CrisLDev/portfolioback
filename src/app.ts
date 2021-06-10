import express from 'express';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import {index} from './routes/index.routes';

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(passport.initialize());

passport.use(passportMiddleware);

app.use('/api', index.tecnologiesRoute, 
                index.projectsRoute,
                index.authRoute
        );

export default app;
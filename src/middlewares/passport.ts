import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import config from '../config';
import User from '../models/User';
import {Request} from 'express';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
}


export const token = (req: Request) => {
    console.log(req.header('x-auth-token'))
}

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if(user){
            return done(null, user);
        }
        return done(null, false)
    } catch (err) {
        console.log(err)
    }
})
import {RequestHandler} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.SECRET, {
      expiresIn: 86400
    });
}

//@Route    Post api/users
//@desc     Register new user
//@access   Public
export const register: RequestHandler = async (req, res) => {

    // Destructuring Request Body
    const {fullname, username, email, password} = req.body;

    // Try save user and verify is not exist
    try {

        // Verify if content is not empty
        if(!fullname || !username || !email || !password){
            return res.status(400).json({errors: [{msg: 'Fill all data.'}]});
        }

        // Search User if exist
        let userExist = await User.findOne({email});

        // If User exist then not register a new user
        if(userExist){
            return res.status(400).json({errors: [{msg: 'Email already in use.'}]});
        }

        // If User not exist then we creating the object user
        const user: IUser = new User({
            fullname, username, email, password
        });

         // Encrypt user password
        user.password = await user.encrypPassword(user.password);

        // Save User
        await user.save();

        // Generating Token
        return res.status(200).json({token: createToken(user)});

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
}

//@Route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
export const login: RequestHandler = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res
              .status(401)
              .json({errors: [{msg: 'Pls send your email and password'}]});
          }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({errors: [{msg: 'User Not exist'}]})
        }
        // Validating Password
        const isMatch = await user.validatePassword(password);

        if(isMatch){
            // Get Token
            return res.status(200).json({token: createToken(user)})
        }

        return res.status(401).json({errors: [{msg: 'Email or password invalid'}]});

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
}

//@Route    GET api/auth
//@desc     Get Personal Info of Logged User
//@access   Public
export const getMe: RequestHandler = async (req, res) => {
 // Ayer me quede por aqui, el error esta en que ya que mandamos a buscar el ussuario con el findbyid no exister el req.params en la ruta so debemos crear un parametro en req como hicmos ne la nueva hera opara guardar la id del usuario

    try {
        const user = req.user;
        if(!user){
            return res.status(400).json({msg: 'There is no user'});
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }

}
import passport from 'passport'
import jwt from 'passport-jwt'
import usersManagerMongoose from '../daos/mongo/userManagerMongoose.js'
import { PRIVATE_KEY } from '../utils/jwt.js'

const userService = new usersManagerMongoose()

const JWTStrategy = jwt.Strategy
const ExtractJWT  = jwt.ExtractJwt

export const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['token']
    }
    return token
}

export const initializePassport  = () => 
{
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
   
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        try {
            let user = await userService.getUser({_id: id})
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}
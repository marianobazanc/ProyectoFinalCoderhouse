import jwt from 'passport-jwt'

import { PRIVATE_KEY } from '../utils/jwt.js'

export const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['token']
    }
    return token
}


export const currentStrategy = (req, res, next) => {
    const token = cookieExtractor(req);
    if (!token) {
        return res.status(401).send({ status: 'error', error: 'Token no encontrado' });
    }

    jwt.verify(token, PRIVATE_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ status: 'error', error: 'Token no válido' });
        }
        req.user = user;
        next();
    });
};
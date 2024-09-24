import { Router } from 'express'
import sessionCotroller from '../../controllers/session.controllers.js';
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { authorization } from "../../middlewares/authorization.middleware.js";

const {
    loginUser,
    registerUser,
    forgotPassword,
    resetPassword,
    currentUser,logout}= new sessionCotroller()

const router = Router()

router.post('/login', loginUser)
router.post('/register',registerUser)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword',resetPassword)

router.get('/current', passportCall('jwt'),authorization('admin'),currentUser)
router.get('/logout',logout)

router.get('/faillogin', (req, res) => {
    return res.status(401).send('Falló el login')
})

router.get('/failregister', (req, res) => {
    return res.status(401).send('Falló el registro del usuario')
})

export default router
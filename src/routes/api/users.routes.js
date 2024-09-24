import { Router } from 'express'
import usernCotroller from '../../controllers/users.controller.js';
import {uploaderUser} from '../../utils/multerUserDocument.js'

const {changeUserRole,addDocuments, deleteUsers,deleteUser}= new usernCotroller()
const router = Router()

router.post('/premium/:uid', changeUserRole)
router.delete('/',deleteUsers)
router.delete('/:uid', deleteUser)

router.post('/:uid/documents', uploaderUser.fields([
    { name: 'documents', maxCount: 5 },
    { name: 'profile', maxCount: 1 },
    { name: 'products', maxCount: 1 }
]), addDocuments)

export default router
import multer from 'multer'
import { __dirname } from '../../src/utils.js'

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname +'/public/upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
        
    }
})

export const uploader = multer({
    storage
})
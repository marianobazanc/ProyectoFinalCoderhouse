import multer from 'multer'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../../src/utils/jwt.js';

import { __dirname } from '../../src/utils.js'
import { logger } from '../utils/logger.js'


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const cookie = req.cookies['token']
      const decodedUser = jwt.verify(cookie, PRIVATE_KEY)
      const mailUser= decodedUser.user.email
    
      let folder = '';
      if (file.fieldname === 'profile') {
        folder = 'profiles';
      } 
      if (file.fieldname === 'products') {
        folder = 'products';
      } 
      if (file.fieldname === 'documents'){
        folder = `documents`; 
      }
      const uploadFolder =__dirname +'/upload/'+ `${req.params.uid}/${folder}`; 
 
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      callback(null, uploadFolder)
    },
    filename:function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    },
  });

  export const uploaderUser = multer({ 
    storage, 
    onError: function(err,next){
        logger.info(err)
        next()
    }
})
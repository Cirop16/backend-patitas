import __dirname from "./index.js";
import multer from 'multer';
import fs from 'fs';
import { error } from "console";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        let folder = `${__dirname}/../public/img`;
        if(file.fieldname === 'documents'){
            folder = `${__dirname}/../public/documents`;
        }
        if(file.fieldname === 'pets'){
            folder = `${__dirname}/../public/pets`;
        }
        fs.mkdirSync(folder, { recursive: true });
        cb(null,folder)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})

export default uploader;
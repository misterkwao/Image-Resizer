import multer from "fastify-multer";
import path from "path";
import { processImage } from "../Utils/image-proc.js";
import fs from 'fs';



let upload = multer({ dest: 'uploads/', fileFilter: (request,file, cb)=>{
    ((file.mimetype.includes('jpeg'))|| (file.mimetype.includes('png') || (file.mimetype.includes('jpg')))) ?  
    cb(null,true) : 
    cb(null,false);
}})

export const imageRoutes = async(server)=>{

    server.get('/home', async(request, reply)=>{
        try {
            reply.code(200).send({message: "Image Processor"})
        }
        catch (error) {
            reply.code(500).send({ success: false, message: error.message});
        }
    });

    server.post('/upload',{preHandler: upload.single('image')}, async (request, reply) => {

        const filePath = path.resolve(request.file.path);
   
        try {
            const result = await processImage(filePath);
            reply.code(200).send({ success: true, message: "Image processed successfully"})
        }
        catch (error) {
            reply.code(500).send({ success: false, message: error.message});
        }
    });
}
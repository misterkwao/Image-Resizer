import Fastify, { fastify } from "fastify";
import multer from "fastify-multer";
import { imageRoutes } from "./routes/imageRoutes.js";
import multipart from '@fastify/multipart';

const server = Fastify({logger: {level: 'info'}});

server.register(multipart);
server.register(imageRoutes, {prefix: '/api/v1'});

export const createServer = async () => {
    server.listen({port: 3000}, (err, address)=>{
        if (err){
            fastify.log.error(err);
            process.exit(1);
        }
        else{
            console.log(`Server listening on ${address}`);
        }
    });
};

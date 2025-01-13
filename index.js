import cluster from "cluster";
import os from "os";
import { createServer } from "./server.js";

    if(cluster.isPrimary){
        console.log(`Primary ${process.pid} is running`);
        const cpus = os.cpus().length;
        for(let i = 0; i < cpus; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker) =>{
            console.log(`Worker ${worker.process.pid} exited. Restarting...`);
            cluster.fork();
        });
    }
    else{
        console.log(`Worker ${process.pid} started.`);
        createServer();
    }
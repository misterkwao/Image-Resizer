import { Worker } from "worker_threads" ;

export const processImage = (image) =>{
    return new Promise((resolve, reject) =>{
        const imageWorker = new Worker('./workers/image-proc-worker.js',{ workerData:{image}});
        imageWorker.on('message', resolve);
        imageWorker.on('error', reject);
        imageWorker.on('exit', (code)=>{
            if (code === 0) reject (new Error(`Worker exited with code ${code}`))
        })
    })
} 
import { workerData, parentPort } from 'worker_threads';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const { image } = workerData;
const outputDir = path.resolve('processed');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

const outputPath = path.join(outputDir, `${Date.now()}-processed.jpg`);

sharp(image).resize(300,300).toFile(outputPath).then(() => {
    parentPort.postMessage({outputPath});
}).catch((err) => {
    parentPort.postMessage({error: err.message});
});
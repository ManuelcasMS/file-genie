import express = require('express');
import BlobStorage from '../controllers/blob-storage';
import { runIndexer } from '../controllers/congnitive-search';
import * as multer from 'multer';
import MulterAzureStorage from '../controllers/multer-azure-storage';

const router = express.Router();
const blobStorage = new BlobStorage();
const upload = multer({storage: new MulterAzureStorage()})

router.post('/', async (req: express.Request, res: express.Response) => {
    await blobStorage.persistBlob("file-genie", "test", "test");
    await runIndexer();
    res.send("posting resource");
});

router.get('/container/:containerName/blobs', async (req: express.Request, res: express.Response) => {
    const containerName = req.params.containerName;
    const blobs = await blobStorage.getBlobNamesFromContainer(containerName);
    res.send(blobs);
})

router.post('/container/:containerName/upload', upload.array("uploaded_files"), function(req, res, next){
    console.log(req.params.files)
    res.send(req.params.files);
});

export default router;
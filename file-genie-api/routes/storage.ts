import express = require('express');
import BlobStorage from '../controllers/blob-storage';
import { runIndexer } from '../controllers/congnitive-search';

const router = express.Router();
const blobStorage = new BlobStorage();

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

export default router;
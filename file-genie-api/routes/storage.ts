/*
 * GET users listing.
 */
import express = require('express');
import BlobStorage from '../controllers/blob-storage';

const router = express.Router();
const blobStorage = new BlobStorage();

router.post('/', (req: express.Request, res: express.Response) => {
    blobStorage.persistBlob("file-genie", "test", "test");
    res.send("posting resource");
});

export default router;
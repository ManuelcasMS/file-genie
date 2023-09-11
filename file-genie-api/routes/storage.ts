/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();

router.post('/', (req: express.Request, res: express.Response) => {
    res.send("posting resource");
});

export default router;
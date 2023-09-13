import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { StorageEngine } from "multer";
import { ParsedQs } from "qs";
import { runIndexer } from "./congnitive-search";
import BlobStorage from "./blob-storage";

export default class MulterAzureStorage implements StorageEngine{

    private blobStorage = new BlobStorage();

    _handleFile = async (
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, 
        file: Express.Multer.File, 
        callback: (error?: any, info?: Partial<Express.Multer.File>) => void): Promise<void> =>
    {
        const res = await this.blobStorage.persistBlobFromStream(req.params.containerName, file.originalname, file.stream);
        await runIndexer();
        callback({ok: true, file: file.originalname})
    }

    _removeFile = async (
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        file: Express.Multer.File,
        callback: (error: Error) => void): Promise<void> => 
    {
        const res = await this.blobStorage.deleteBlobFromContainer(req.params.containerName, file.originalname);
        callback(new Error(`failed to upload ${file.filename}.`))
    }

}
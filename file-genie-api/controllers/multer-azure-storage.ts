import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { StorageEngine } from "multer";
import { ParsedQs } from "qs";
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import { runIndexer } from "./congnitive-search";

export default class MulterAzureStorage implements StorageEngine{

    private blobServiceClient = new BlobServiceClient(
        `https://myfilestorage66.blob.core.windows.net`,
        new DefaultAzureCredential()
    );

    _handleFile = async (
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, 
        file: Express.Multer.File, 
        callback: (error?: any, info?: Partial<Express.Multer.File>) => void): Promise<void> =>
    {
        const containerClient = this.blobServiceClient.getContainerClient(req.params.containerName);

        if(!await containerClient.exists()){
            containerClient.create();
        }

        const blobClient = containerClient.getBlockBlobClient(req.params.blobName);
        const uploadResponse = await blobClient.uploadStream(file.stream);
        await runIndexer();
        callback({ok: true, file: file.filename,})
    }

    _removeFile = async (
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        file: Express.Multer.File,
        callback: (error: Error) => void): Promise<void> => 
    {
        const containerClient = this.blobServiceClient.getContainerClient(req.params.containerName);

        if(!await containerClient.exists()){
            containerClient.create();
        }

        const blobClient = containerClient.getBlockBlobClient(req.params.blobName);
        blobClient.deleteIfExists();
        callback(new Error(`failed to upload ${file.filename}.`))
    }

}
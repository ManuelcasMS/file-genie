
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import { Readable } from 'stream';

export default class BlobStorage {
    private blobServiceClient = new BlobServiceClient(
        `https://myfilestorage66.blob.core.windows.net`,
        new DefaultAzureCredential()
    );

    persistBlob = async (containerName: string, blobName: string, blobContent: string) => {
        
        const blobClient = await this.getBlobClient(containerName, blobName);
        const uploadResponse = await blobClient.upload(blobContent, blobContent.length);
    }

    persistBlobFromStream = async (containerName: string, blobName: string, blobContent: Readable) => {
        const blobClient = await this.getBlobClient(containerName, blobName);
        return await blobClient.uploadStream(blobContent);
    }

    deleteBlobFromContainer = async (containerName: string, blobName: string) => {
        const blobClient = await this.getBlobClient(containerName, blobName);
        return await blobClient.deleteIfExists();
    }

    getBlobNamesFromContainer = async (containerName: string) => {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        if(!await containerClient.exists()){
            return [];
        }

        const result: string[] = []
        for await (const blob of containerClient.listBlobsFlat()) {
            result.push(blob.name);
        }

        return result;
    }

    private getBlobClient = async (containerName: string, blobName: string) => {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        if(!await containerClient.exists()){
            containerClient.create();
        }

        return containerClient.getBlockBlobClient(blobName);
    }
}
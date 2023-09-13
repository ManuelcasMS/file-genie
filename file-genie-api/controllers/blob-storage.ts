
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';

export default class BlobStorage {
    private blobServiceClient = new BlobServiceClient(
        `https://myfilestorage66.blob.core.windows.net`,
        new DefaultAzureCredential()
    );

    persistBlob = async (containerName: string, blobName: string, blobContent: string) => {
        console.log(this.blobServiceClient)
        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        if(!await containerClient.exists()){
            containerClient.create();
        }

        const blobClient = containerClient.getBlockBlobClient(blobName);
        const uploadResponse = await blobClient.upload(blobContent, blobContent.length);
        
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
}
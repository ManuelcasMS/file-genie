
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';

export default class BlobStorage {
    private blobServiceClient = new BlobServiceClient(
        `https://myfilestorage66.blob.core.windows.net`,
        new DefaultAzureCredential()
    );

    persistBlob = async (containerName: string, blobName: string, blobContent: string) => {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        if(!containerClient.exists()){
            containerClient.create();
        }

        const blobClient = containerClient.getBlockBlobClient(blobName);
        const uploadResponse = await blobClient.upload(blobContent, blobContent.length);
        
    } 
}
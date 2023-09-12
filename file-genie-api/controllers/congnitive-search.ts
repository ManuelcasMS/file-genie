import { DefaultAzureCredential } from "@azure/identity";
import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";
import {
  AzureKeyCredential,
  SearchIndexerClient
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKeySecretName = process.env.SEARCH_API_ADMIN_KEY_SECRET_NAME || "";
const keyvaultEndpoint = process.env.KEY_VAULT_ENDPONT || "";
const indexName = "my--file-search-index";

const connectionString = process.env.CONNECTION_STRING || "";
const dataSourceName = "my-file-storage-source";

const indexerName = "my-file-doc-extraction-indexer";



async function getSecret(secretname: string): Promise<KeyVaultSecret> {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(keyvaultEndpoint, credential);
  return await client.getSecret(secretname);
}

export async function runIndexer() {
  console.log("Running Indexer Operations Sample....");
  console.log(process.env.ENDPOINT);
  if (!endpoint || !indexerName) {
    console.log("Make sure to set valid values for endpoint and indexer with proper authorization.");
    return;
  }
  // const apiKeySecret = await getSecret(apiKeySecretName);
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential("HY1bhV50PxeLQ39jYk0Du3blfKcqy5ZD0RBvaR8wQsAzSeBIbIgj"));
  try {
    console.log("Run Indexer Operation");
    await client.runIndexer(indexerName);
  } catch (err) {
    console.error("Running Indexer Operations encountered an error:", err);
  } finally {
    console.log("Running Indexer Operations complete.");
  }
}


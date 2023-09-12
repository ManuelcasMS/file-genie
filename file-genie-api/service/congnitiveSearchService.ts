import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndex,
  SearchIndexerClient,
  SearchIndexerDataSourceConnection,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const indexName = "my--file-search-index";

const connectionString = process.env.CONNECTION_STRING || "";
const dataSourceName = "example-ds-connection-sample-1";

const indexerName = "example-indexer-sample-1";

export async function getAndUpdateIndex() {
  console.log(`Running Index Operations Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    console.log(`Get And Update Index Operation`);
    const index: SearchIndex = await client.getIndex(indexName);
    index.fields.push({
      type: "Edm.DateTimeOffset",
      name: "lastUpdatedOn",
      filterable: true
    });
    await client.createOrUpdateIndex(index);
  } catch (err) {
    console.error("Running Index Operation encountered an error:", err);
  } finally {
    console.log(`Running Index Operations complete.`);
  }
}

export async function getAndUpdateDataSourceConnection(containerName: string) {
  console.log(`Running DS Connection Operations Sample....`);
  if (!endpoint || !apiKey || !connectionString) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    console.log(`Get And Update DS Connection Operation`);
    const ds: SearchIndexerDataSourceConnection = await client.getDataSourceConnection(
      dataSourceName
    );
    ds.container.name = containerName;
    console.log(`Updating Container Name of Datasource Connection ${dataSourceName}`);
    await client.createOrUpdateDataSourceConnection(ds);
  } catch (err) {
    console.error("Running DS Connection Operations encountered an error:", err);
  } finally {
    console.log(`Running DS Connection Operations complete.`);
  }
}

export async function runIndexer() {
  console.log(`Running Indexer Operations Sample....`);
  if (!endpoint || !apiKey || !dataSourceName || !indexName) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    console.log(`Run Indexer Operation`);
    await client.runIndexer(indexerName);
  } catch (err) {
    console.error("Running Indexer Operations encountered an error:", err);
  } finally {
    console.log(`Running Indexer Operations complete.`);
  }
}


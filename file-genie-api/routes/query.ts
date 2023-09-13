/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";

interface ChatInfo {
  content: string;
  role: string;
}

async function test(chatInfo: ChatInfo[]) {
  try {
    const client = new OpenAIClient(
      "https://openai-test-11.openai.azure.com/",
      new AzureKeyCredential("fc1426f188c74182bbdb6f591408d4db")
    );
    const response = await client.getChatCompletions("open-ai-test-11-chat", chatInfo,
      {
        maxTokens: 150,
        azureExtensionOptions: {
          extensions: [
            {
              type: "AzureCognitiveSearch",
              parameters: {
                endpoint: endpoint,
                key: "HY1bhV50PxeLQ39jYk0Du3blfKcqy5ZD0RBvaR8wQsAzSeBIbIgj",
                indexName: "my--file-search-index",
              }
            }
          ]
        }
      });
    return response.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
  return false;
}

router.post('/', async (req: express.Request, res: express.Response) => {
  const chatInfo = req.body.chatInfo as ChatInfo[];
  const resp = await test(chatInfo);
  res.send(resp);
});

export default router;
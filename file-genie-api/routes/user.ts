/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// create application/json parser
var jsonParser = bodyParser.json()

interface ChatInfo {
    content: string;
    role: string;
}

async function test(chatInfo: ChatInfo[])
{    
    try{
        const client = new OpenAIClient(
        "https://openai-test-11.openai.azure.com/", 
        new AzureKeyCredential("fc1426f188c74182bbdb6f591408d4db")
        );
        const response = await client.getChatCompletions("open-ai-test-11-chat",  chatInfo);
        return response.choices[0].message.content;
    }catch (err){
        console.log(err);
    }   
    return false;
}

router.post('/',jsonParser, async (req: express.Request, res: express.Response) => {
    const chatInfo = req.body.chatInfo as ChatInfo[];
    const resp =  await test(chatInfo);
    res.send(resp);
});

export default router;
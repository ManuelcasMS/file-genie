/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");


async function test(question: string)
{    
    try{
        const client = new OpenAIClient(
        "https://openai-test-11.openai.azure.com/", 
        new AzureKeyCredential("fc1426f188c74182bbdb6f591408d4db")
        );
        const response = await client.getChatCompletions("open-ai-test-11-chat",  [{"role":"user","content":question}]);
        return response.choices[0].message.content;
    }catch (err){
        console.log(err);
    }   
    return false;
}

router.get('/', async (req: express.Request, res: express.Response) => {
    const question = req.query.question.toString();
    const resp =  await test(question);
    res.send(resp);
});

export default router;
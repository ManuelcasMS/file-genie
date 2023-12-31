/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import './App.css'
// RCE CSS
import 'react-chat-elements/dist/main.css'
import styles from "./styles/chat.module.scss";
import { MessageList, Input, Button, MessageType } from 'react-chat-elements'
import FileUpload from './FileUpload';

interface ChatInfo {
  content: string;
  role: string;
}
function App() {  
  const messageListReferance = React.createRef();  
  const inputReferance = React.createRef()
  const [inputMessage, setInputMessage] = React.useState<string>("");
  const [chatHistory, setChatHistory] = React.useState<MessageType[]>([]);
  const [chatInfoHistory, setchatInfoHistory] = React.useState<ChatInfo[]>([]);  
  const [uploadedFilesList, setUploadedFilesList] = React.useState<string[]>([]);

  React.useEffect(() => {
    getUploadedFiles();
  }, []);

  const getUploadedFiles = async () => {
    fetch('https://web-app-file-genie-backend.azurewebsites.net/storage/container/myfiles/blobs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      console.log("Hellooooo 1");
      const resp = await response.json() as string[];
      console.log(resp);    
      const listUploadedFiles: string[] = [];
      resp.forEach(uploadedFile => {
        listUploadedFiles.push(uploadedFile);
      });
      setUploadedFilesList([...listUploadedFiles]);
    });
  }
 
  const sendQuestionToBot = async () => {
    fetch('https://web-app-file-genie-backend.azurewebsites.net/query', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"chatInfo":chatInfoHistory})
    }).then(async (response) => {
      console.log(response.body);
      const botResponse = await response.text();
      chatInfoHistory.push({content: botResponse, role: 'assistant'} as ChatInfo);
      setchatInfoHistory([...chatInfoHistory]);
      const newMessage = {
        className: styles.chatMessage,
        position: 'left',
        type: 'text',                
        text: botResponse,
        date: new Date(),
        id: 0,
        title: "Bot",
        avatar: 'https://th.bing.com/th/id/R.87de1438c5c5f2c1e462d3305df60b01?rik=yi%2f%2beMTAn%2fFzQg&pid=ImgRaw&r=0',
        focus: false,
        titleColor: 'Black',
        forwarded: false,
        notch: false,
        removeButton: false,
        replyButton: false,
        retracted: false,
        status: 'read',
        role: 'assistant',    
      } as MessageType;
      chatHistory.push(newMessage);
      setChatHistory([...chatHistory]);
    });

  }
  let clearInput = () => {}

  const addMessage = async () => {
    if(inputMessage === "") return;
    const newMessage = {
      className: styles.chatMessage,
      position: 'right',
      type: 'text',                
      text: inputMessage,
      date: new Date(),
      id: 0,
      title: "User",
      avatar: 'https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?pid=ImgDet&rs=1',
      focus: false,
      titleColor: 'Black',
      forwarded: false,
      notch: false,
      removeButton: false,
      replyButton: false,
      retracted: false,
      status: 'read',
      role: 'user',    
    } as MessageType;
    setInputMessage("");
    chatHistory.push(newMessage);
    chatInfoHistory.push({content: inputMessage, role: 'user'});
    setchatInfoHistory([...chatInfoHistory]);
    setChatHistory([...chatHistory]);
    clearInput();
    // Send message to OpenAI:
    await sendQuestionToBot();

  }

  return (
      <div className={styles.rootContainer}>
        <div className={styles.chatBox}>
          <div className={styles.chatHistory}>    
            <div className={styles.chatHistoryContainer}>
              {
                <MessageList
                  referance={messageListReferance}      
                  lockable={true}
                  toBottomHeight={'100%'}
                  dataSource={chatHistory}
                />
              }
            </div>
          </div>
          <div className={styles.chatInputContainer}>
          <Input
            inputStyle={{ color: 'black', backgroundColor: 'white', borderStyle: 'inset', borderWidth: '2px' }}
            referance={inputReferance}
            placeholder='Type here...'
            className={styles.chatInput}
            maxHeight={100}
            multiline={false}
            value={inputMessage}
            clear={(clear: () => void) => clearInput = clear}
            rightButtons={<Button color='white' backgroundColor='black' text='Send' onClick={addMessage} />}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputMessage(e.target.value)}
          />
          </div>
        </div>
        <div className={styles.docUpload}>
          <FileUpload onUpload={getUploadedFiles}/>
          <div className={styles.uploadedFiles}>
            <h3>Uploaded Files</h3>
            <div className={styles.listUploadedFiles}>
              <ul>
              {
                uploadedFilesList.map((uploadedFileName, index) => {
                  return (
                    <li key={index}>
                      {uploadedFileName}
                    </li>
                  )
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App

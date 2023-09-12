/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import './App.css'
// RCE CSS
import 'react-chat-elements/dist/main.css'
import styles from "./styles/chat.module.scss";
import { MessageList, Input, Button, MessageType } from 'react-chat-elements'
function App() {  
  const messageListReferance = React.createRef();  
  const inputReferance = React.createRef()
  const [inputMessage, setInputMessage] = React.useState<string>("");
  const [chatHistory, setChatHistory] = React.useState<MessageType[]>([]);

  const addMessage = () => {
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
      status: 'read'    
    } as MessageType;
    setInputMessage("");
    chatHistory.push(newMessage);
    setChatHistory([...chatHistory]);
  }
  return (
    <>
    <div className={styles.chatBox}>
      
      {
        <>    
        <div className={styles.chatHistory}>    
          {
            <MessageList
              referance={messageListReferance}      
              lockable={true}
              toBottomHeight={'100%'}      
              dataSource={chatHistory}
            />
          }
        </div>
     <Input
        inputStyle={{ color: 'black', backgroundColor: 'white', borderStyle: 'inset', borderWidth: '2px' }}
        referance={inputReferance}
        placeholder='Type here...'
        className={styles.chatInput}
        maxHeight={100}
        multiline={true}
        clear={() => { }}
        value={inputMessage}
        rightButtons={<Button color='white' backgroundColor='black' text='Send' onClick={addMessage} />}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputMessage(e.target.value)}

        
      />
     </>
      }
      </div>   
    </>
  )
}

export default App

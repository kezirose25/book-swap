import React, {useState} from "react";
import './MyMessages.css';
import MailList from '../components/MailList.js'

export default function MyMessages(props) {
    const [openMessage, setOpenMessage] = useState(null);

    const openNewMessage = (id) => {
        let openedMessage = props.messages.filter(m => m.messageid === id); 
        setOpenMessage(openedMessage[0]);
       }

  return (
    <div id="my-messages">
        <h1>SwapMail</h1>
        
        <div id="mail-container" className="mt-5">
        <div className="me-5">
        <MailList messages={props.messages} currentUser={props.currentUser} openMessage={(id) => openNewMessage(id)}/>
        </div>

        <div id="message-pane">
        
        {(!openMessage) ? <h4 className="text-muted"> No message selected.</h4> : 
            (<div>
                <h4>{openMessage.messagesubject}</h4>
                <h5>{openMessage.sender}</h5>
                <p>{openMessage.body}</p>
            </div>
            )
            }
        </div>
        </div>
    </div>
  );
}
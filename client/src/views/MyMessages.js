import React, {useState, useEffect} from "react";
import './MyMessages.css';
import MailList from '../components/MailList.js';
import NewMessage from '../components/NewMessage.js';

export default function MyMessages(props) {
    const [openMessage, setOpenMessage] = useState(null);
    const [messageOpen, setMessageOpen] = useState(false);
    const [prefilled, setPrefilled] = useState("none");


    useEffect(() => {
        props.resetSubmitSuccess();
      }, []);

    const openNewMessage = (id) => {
        let openedMessage = props.messages.filter(m => m.messageid === id); 
        setOpenMessage(openedMessage[0]);
       }

    const deleteThisMessage = (id) => {
        props.deleteMessage(id);
    }

    const handleOpen = (e) => {
        setMessageOpen(true);
      }

    const handleReply = (e) => {
        setPrefilled("reply");
        setMessageOpen(true);
    }
    
    const closeMessage = (e) => {
        setMessageOpen(false);
      }
    
    const sendMessage = (msg) => {
        props.addNewMessage(msg);
        setPrefilled("none");
      }

  return (
    <div id="my-messages">
        <h1>SwapMail</h1>
        <div className="d-flex justify-content-start"><button className="btn btn-primary" onClick={e => handleOpen(e)}>Compose new message</button></div>
        
        {props.submitSuccess && (<div className="border bg-light d-flex justify-content-center align-items-center p-2 mb-4 my-3"><p id="submit-text"className="text-success">Message sent!</p></div>)}
        
        <div id="mail-container" className="mt-5">
        
        <div className="me-5">
        <MailList messages={props.messages} currentUser={props.currentUser} openMessage={(id) => openNewMessage(id)} deleteMessageCB={(id) => deleteThisMessage(id)}/>
        </div>

        <div id="message-pane" className="px-5 py-5 rounded-3">
        
        {(!openMessage) ? <h4 className="text-muted"> No message selected.</h4> : 
            (<div>
                <h4>{openMessage.messagesubject}</h4>
                {openMessage.sender === props.currentUser ? (
                    <div>
                    <h5>To: {openMessage.recipientname}</h5>
                    <p className="text-muted">From: you</p>
                    </div>
                ) : (
                    <div>
                    <h5>From: {openMessage.sendername}</h5>
                    <p className="text-muted">To: you</p>
                    </div>
                )}
                <p>{openMessage.body}</p>
                <button onClick={e => handleReply(e)} className="btn btn-primary btn-sm">Reply</button>
            </div>
            )
            }
        </div>
    
        </div>

        {messageOpen && <NewMessage closeMessage={e => closeMessage(e)} sendMessage={message => sendMessage(message)} prefilled={prefilled} openMessage={openMessage}/>}
    </div>
  );
}
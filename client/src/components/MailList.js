import React from "react";

export default function MailList(props) {

    let mySentItems = props.messages.filter(m => m.sender === props.currentUser);
    for (let message of mySentItems) {
        let datetime = new Date(message.timestamp.toString());
        let dtString = datetime.toString().slice(0,25);
        message.timestamp = dtString;
    } 
    let myReceivedItems = props.messages.filter(m => m.recipient === props.currentUser);
    for (let message of myReceivedItems) {
        let datetime = new Date(message.timestamp.toString());
        let dtString = datetime.toString().slice(0,25);
        message.timestamp = dtString;
    } 

    const handleClick = (id) => {
        props.openMessage(id);
    }

    const handleDelete = (id) => {
        props.deleteMessageCB(id)
    }

  return (
        <div id="mailbox">
        <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="nav-inbox-tab" data-bs-toggle="tab" data-bs-target="#nav-inbox" type="button" role="tab" aria-controls="nav-inbox" aria-selected="true">Inbox</button>
            <button className="nav-link" id="nav-sent-tab" data-bs-toggle="tab" data-bs-target="#nav-sent" type="button" role="tab" aria-controls="nav-sent" aria-selected="false">Sent items</button>
        </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-inbox" role="tabpanel" aria-labelledby="nav-inbox-tab">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">From</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Received</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
  
                    <tbody>
                        {myReceivedItems.map(message => (
                            <tr key={message.messageid}>
                            <td>{message.sendername}</td>
                            <td>{message.messagesubject}</td>
                            <td>{message.timestamp}</td>
                            <td><button onClick={e => handleClick(message.messageid)} className="btn btn-primary btn-sm">View</button></td>
                            <td><button onClick={e => handleDelete(message.messageid)} className="btn btn-danger btn-sm"> Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  
        <div className="tab-pane fade" id="nav-sent" role="tabpanel" aria-labelledby="nav-sent-tab">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">To</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Sent</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
  
                <tbody>
                    {mySentItems.map(message => (
                        <tr key={message.messageid}>
                        <td>{message.recipientname}</td>
                        <td>{message.messagesubject}</td>
                        <td>{message.timestamp}</td>
                        <td><button onClick={e => handleClick(message.messageid)} className="btn btn-primary btn-sm">View</button></td>
                        <td><button onClick={e => handleDelete(message.messageid)} className="btn btn-primary btn-sm">Delete</button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </div>
        </div>
  )
}
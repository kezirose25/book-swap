import React, {useState} from "react";

export default function NewMessage(props) {
  let subjectLine = `Proposed swap: ${props.highlightedBook.title}`
    const [formData, setFormData] = useState({
        recipient: null,
        messagesubject: "",
        body: ""
    })

    const handleClose = e => {
        props.closeMessage();
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.sendMessage(formData);
        setFormData({
            recipient: null,
            messagesubject: "",
            body: ""
        })
        props.closeMessage();
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setFormData(state => ({
            ...state,
            [name]: value
          }));
    }

  return (

      <div className="container p-3 mt-5">
        <div className="d-flex justify-content-end my-3">
            <button className="btn btn-danger" onClick={e => handleClose(e)}>X</button>  
        </div>
        
        <form onSubmit={e => handleSubmit(e)}>
            
            <div className="form-floating my-3">
            <input 
            className="form-control" 
            id="floatingInputValue" 
            placeholder="To" 
            name="recipient"
            value={formData.recipient}
            onChange={e => handleChange(e)} />
            <label htmlFor="floatingInputValue">To:</label>
            </div>
            
            <div className="form-floating my-3">
            <input 
            className="form-control" 
            id="floatingInputValue" 
            placeholder={subjectLine} 
            name="messagesubject"
            value={formData.messagesubject}
            onChange={e => handleChange(e)} />
            <label htmlFor="floatingInputValue">Subject:</label>
            </div>

            <div className="form-floating my-3">
            <input 
            className="form-control" 
            id="floatingInputValue" 
            placeholder="Enter your message here" 
            name="body"
            value={formData.body}
            onChange={e => handleChange(e)} />
            <label htmlFor="floatingInputValue">Message:</label>
            </div>
  
            <button className="btn btn-primary" type="submit">Send</button>

        </form>

        {formData.recipient}, {formData.messagesubject}, {formData.body} 

      </div>

  );
}
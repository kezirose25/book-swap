import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import BookForm from '../components/BookForm.js';

export default function NewBookForm(props) {
    const [addOrEdit, setAddOrEdit] = useState("add");

  useEffect(() => {
    props.resetSubmitSuccess();
  }, []);

  const addBookCB = (book) => {
    props.addBookCB(book);
  }  

  return (
    
    <div id="new-book-form">
        <h3>Add Book</h3>

        {props.submitSuccess && <div className="border bg-light d-flex justify-content-center align-items-center px-2 py-2"><p className="text-success">Submission successful! You can add another book below or go back to <Link to="/mybooks">My Books</Link>.</p></div>}

        <BookForm addOrEdit={addOrEdit} addBookCB={book => addBookCB(book)} bookToEdit={{}} />        

    </div>

  );
}
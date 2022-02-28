import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Error404View from './Error404View.js';
import NewMessage from "../components/NewMessage.js";
import LoadingScreen from '../components/LoadingScreen.js';

import "./BookDetail.css";

export default function BookDetail(props) {
  const [highlightedBook, setHighlightedBook] = useState({});
  const [loading, setLoading] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false);
  const [prefilled, setPrefilled] = useState("bookDetailPage");
  const [show404, setShow404] = useState(false);
  let { id } = useParams();  // get book ID from URL

  useEffect(() => {
    getHighlighted(id);
  }, []);

  const getHighlighted = async id => {
    setLoading(true);
    try {
      let response = await fetch(`/books/${id}`);
      if (response.ok) {
        let highlighted = await response.json();
        setHighlightedBook(highlighted);
        console.log(highlighted)
        setLoading(false);
      } else {
        if (response.status === 404) {
          setLoading(false);
          setShow404(true)
        };
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

  const handleOpen = (e) => {
    setMessageOpen(true);
  }

  const closeMessage = (e) => {
    setMessageOpen(false);
  }

  const sendMessage = (msg) => {
    props.addNewMessage(msg);
  }


  if (Object.keys(highlightedBook).length === 0) {
      if (loading) {return <LoadingScreen />}
      else if (show404) {return <Error404View />} 
  }
  // Return Loading component
  // If show 404 is true, return Error404
  // Loading prop  

  return (
    <div id="highlighted-book" className="px-5 py-5 rounded-3">

        <div className="d-flex justify-content-end mb-3"><Link to="/books" className="btn btn-primary">Back to All Books</Link></div>
        
        <div id="book-info-container" className="d-flex">

        <img id="bookimg" src={highlightedBook.imgurl}></img>
        <div id="highlighted-text" className="px-5">
            
            <button className="btn btn-secondary mb-3">Genre: {highlightedBook.genre}</button>
            <button className="btn btn-secondary mb-3">Condition: {highlightedBook.bookcondition}</button>
            <h2>{highlightedBook.title}</h2>
            <h3>{highlightedBook.authors}</h3>
            <p>{highlightedBook.summary}</p>

              {highlightedBook.addedby === props.currentUser ? <p>You added this book! Visit My Books to edit or delete this listing.</p> : (
                <div className="shadow-sm bg-body rounded border px-3 py-3">
                <p>Uploaded by: {highlightedBook.username}</p>
                <p>Their wishlist: {highlightedBook.wishlist}</p>
                <button className="btn btn-primary" onClick={e => handleOpen(e)}>Propose a swap!</button>
                </div>
              )
              }   
        </div>

        </div>
           
        {messageOpen && <NewMessage highlightedBook={highlightedBook} closeMessage={e => closeMessage(e)} sendMessage={message => sendMessage(message)} prefilled={prefilled}/>}

    </div>
  );
}


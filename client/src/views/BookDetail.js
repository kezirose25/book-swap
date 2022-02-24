import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Error404View from './Error404View.js';

import "./BookDetail.css";

export default function BookDetail(props) {
  const [highlightedBook, setHighlightedBook] = useState({});
  let { id } = useParams();  // get user ID from URL

  useEffect(() => {
    getHighlighted(id);
  }, []);

  const getHighlighted = async id => {
    try {
      let response = await fetch(`/books/${id}`);
      if (response.ok) {
        let highlighted = await response.json();
        console.log(highlighted);
        setHighlightedBook(highlighted);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

  return (
    <div id="highlighted-book">
        <img id="bookimg" src={highlightedBook.imgurl}></img>
        <div id="highlighted-text" className="px-5">
            <div className="d-flex justify-content-end mb-3"><Link to="/books" className="btn btn-primary">Back to All Books</Link></div>
            <button className="btn btn-secondary mb-3">{highlightedBook.genre}</button>
            <h2>{highlightedBook.title}</h2>
            <h3>{highlightedBook.authors}</h3>
            <p>{highlightedBook.summary}</p>
            <div>
              <p>Uploaded by: {highlightedBook.username}</p>
              <p>Their wishlist: {highlightedBook.wishlist}</p>
              <button className="btn btn-primary">Propose a swap!</button>
            </div>
            
            
        </div>
        
        
    </div>
  );
}


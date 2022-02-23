import React from "react";
import {Link, useParams} from "react-router-dom";
import Error404View from './Error404View.js';

import "./BookDetail.css";

export default function BookDetail(props) {
  let { id } = useParams();  // get user ID from URL
  console.log(id)
  let highlightedBook = props.books.find(b => b.bookid === Number(id));
  console.log(highlightedBook);

    // Return 404 if user doesn't exist
    if (!highlightedBook) {
        return <Error404View />;
    }

  return (
    <div id="highlighted-book">
        <img src={highlightedBook.imgurl}></img>
        <div id="highlighted-text">
            <p>Genre: {highlightedBook.genre}</p>
            <h2>Title: {highlightedBook.title}</h2>
            <h3>Authors: {highlightedBook.authors}</h3>
            <p>Description: {highlightedBook.summary}</p>
            <Link to="/books" className="btn btn-primary">Back to All Books</Link>
        </div>
        
        
    </div>
  );
}
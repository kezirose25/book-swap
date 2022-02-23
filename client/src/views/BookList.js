import React from "react";
import {Link} from "react-router-dom";
import "./BookList.css";

export default function BookList(props) {
  
  const handleViewBook = id => {
    props.viewBook(id);
  };

  return (
    <div id="book-grid">
        {props.books.map(book => (
          <div className="book-box" key={book.bookid}>
            <img className="book-thumb" src={book.imgurl}></img>
            <h3>{book.title}</h3>
            <p>{book.authors}</p>
            <Link className="btn btn-primary" to={'/books/'+book.bookid}>View details</Link>
          </div>
        ))}
    </div>
  );
}
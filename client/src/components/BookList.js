import React from "react";
import "./BookList.css";

export default function BookList(props) {
  
  const handleViewBook = id => {
    props.viewBook(id);
  };

  return (
    <div id="book-grid">
        {props.books.map(book => (
          <div className="book-box" key={book.id}>
            <img className="book-thumb" src={book.imgurl}></img>
            <h3>{book.title}</h3>
            <p>{book.authors}</p>
            <button onClick={e => handleViewBook(book.id) } className="btn btn-primary">
             More info
            </button>
          </div>
        ))}
    </div>
  );
}
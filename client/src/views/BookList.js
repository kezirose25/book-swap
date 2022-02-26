import React from "react";
import {Link} from "react-router-dom";
import "./BookList.css";

export default function BookList(props) {
  
  const handleViewBook = id => {
    props.viewBook(id);
  };

  return (
  <div className="container" id="book-list">
        <hr className="mx-auto"/>
        <div className="row justify-content-between">
            {props.books.map(book => (
              <div className="col-lg-3 col-md-5 m-3" key={book.bookid}>
                <div className="card">
                  <img src={book.imgurl} className="card-img-top" alt={book.title} />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.authors}</p>
                    <Link className="btn btn-primary" to={'/books/'+book.bookid}>View details</Link>
                  </div>
                </div>                
              </div>
            ))}
        </div>
  </div>
    
    
  );
}
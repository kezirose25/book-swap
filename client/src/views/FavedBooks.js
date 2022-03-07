import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./FavedBooks.css";

// map favebooks by user id
function FavedBooks(props) {
    return (
        <div className="container" id="faves-list">
        <div>
        <hr className="mx-auto"/>
        <div className="row justify-content-between">
            {props.faves.map(f => (
              <div 
              className="All col-lg-3 col-md-5 m-3"
              key={f.bookid}>
                <div className="card">
                <div className="badge badge-pill badge-primary">Unfave</div>
                  <img src={f.imgurl} className="card-img-top" alt={f.title} />
                  <div className="card-body">
                    <h5 className="card-title">{f.title}</h5>
                    <p className="card-text">{f.authors}</p>
                  </div>
                </div>                
              </div>
            ))}
        </div>
        </div>
        </div>
      );
}

export default FavedBooks;
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Bookmarked.css";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import IconButton from '@mui/material/IconButton';

// map favebooks by user id
function FavedBooks(props) {

  function handleChange(e) {
  }

  useEffect(() => {
  }, [props.books]);

  // function refreshPage() {
  //   window.location.reload(false);
  // }

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
                  <img src={f.imgurl} className="card-img-top" alt={f.title} />
                  <div className="card-body">
                    <h5 className="card-title">{f.title}</h5>
                    <p className="card-text">{f.authors}</p>
                    <Link className="btn btn-primary" to={'/bookmarked/'+f.bookid}>View details</Link>

                <IconButton aria-label="delete" className="btn btn-secondary"
                      value={f.bookid}
                      onClick={() => props.deleteFave(f.bookid)}
                      onChange={handleChange}
                      style={{ color: '#0072ea' }}>
                        <BookmarkRemoveIcon fontSize="large"/>
                      </IconButton>

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
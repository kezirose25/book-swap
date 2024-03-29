import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./BookList.css";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/material/IconButton';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export default function BookList(props) {
  const [filterGenre, setFilterGenre] = useState("All");

  useEffect(() => {
  }, [props.books]);

  // Uses Set class to generate list of genres without repeating items
  let genres = [...new Set(props.books.map(book => book.genre))].filter(genre => genre != 'Genre not specified');
  
  // Filter functionality
  const changeFilter = (e) => {
    setFilterGenre(e.target.value)
  }

  // handleClick needs to call addNewFave function to take
  // value of book.bookid and add to junction table. Need user id too?
  // or can I call addNewFave onclick instead of handleClick?

  const handleClick = (e) => {
    console.log("clicked");
    props.addNewFave(e.target.value);
  }

  function handleChange(e) {
  }

  return (
  <div className="container" id="book-list">

      <div className="d-flex justify-content-end">
        <div id="filter" className="px-2">
          <label id="list-filter" className="me-2" htmlFor="genre-filter">
            Show genre:
          </label>

          <select
            id="genre-filter"
            name="genre-filter"
            onChange={e => changeFilter(e)}
          >
            <option value="All">All</option>
            {genres.map(genre => (
              <option 
              key={genre}
              value={`${genre}`}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

        <hr className="mx-auto"/>
        <div className="row justify-content-between">
            {props.books.map(book => (
              <div 
              className={`${book.genre === filterGenre || filterGenre === "All" ? "col-lg-3 col-md-5 m-3" : "invisible"}`}
              key={book.bookid}>
                <div className="card">
                  <img src={book.imgurl} className="card-img-top" alt={book.title} />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.authors}</p>
                    <Link className="btn btn-primary" to={'/books/'+book.bookid}>View details</Link>

                    {book.isfave === null ? (
                      
                      <IconButton aria-label="delete"
                      className="btn btn-secondary"
                      style={{ color: '#0072ea' }} 
                      value={book.bookid} 
                      onClick={() => props.addNewFave(book.bookid)}>
                        <BookmarkAddIcon fontSize="large"/>
                      </IconButton>)
                      :
                      (<BookmarkAddedIcon fontSize="large"
                      color="disabled"
                      style={{ color: '#eeeeee' }}/>)
                      }

                  </div>
                </div>                
              </div>
            ))}
        </div>

  </div>
  );
}

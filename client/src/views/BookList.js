import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./BookList.css";

export default function BookList(props) {
  const [filterGenre, setFilterGenre] = useState("All");

  // Uses Set class to generate list of genres without repeating items
  let genres = [...new Set(props.books.map(book => book.genre))].filter(genre => genre != 'Genre not specified');
  
  // Filter functionality
  const changeFilter = (e) => {
    setFilterGenre(e.target.value)
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
                <div className="badge badge-pill badge-primary">Save</div>
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
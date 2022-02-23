import React from "react";
import './MyBooks.css';
import {Link} from 'react-router-dom';

export default function MyBooks(props) {
  let usersBooks = props.books.filter(book => book.addedby === props.currentUser);

  return (
    <div id="my-books">
        <h3>My books</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author(s)</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Condition</th>
                    <th scope="col"></th>
                </tr>
            </thead>
  
            <tbody>
                {usersBooks.map(book => (
                    <tr>
                    <td>{book.title}</td>
                    <td>{book.authors}</td>
                    <td>{book.genre}</td>
                    <td>{book.bookcondition}</td>
                    <td>Edit Listing</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
        <Link to="/mybooks/addnew" className="btn btn-primary">Add a book</Link>
    </div>
  );
}
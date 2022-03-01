import React from "react";
import {Link} from 'react-router-dom';
import './MyBooks.css'

export default function MyBooks(props) {
  let usersBooks = props.books.filter(book => book.addedby === props.currentUser);

    const handleDelete = (bookID) => {
        props.deleteBook(bookID)
    }

  return (
    <div className="container px-5" id="my-books">
        <h3>My books</h3>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author(s)</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Condition</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
  
            <tbody>
                {usersBooks.map(book => (
                    <tr key={book.bookid}>
                    <td>{book.title}</td>
                    <td>{book.authors}</td>
                    <td>{book.genre}</td>
                    <td>{book.bookcondition}</td>
                    <td><Link to={'/mybooks/edit/'+book.bookid} className="btn btn-primary">Edit</Link></td>
                    <td><button className="btn btn-danger" onClick={e => handleDelete(book.bookid)}>Delete</button></td>
                    </tr>
                ))}
                
            </tbody>
        </table>
        <Link to="/mybooks/addnew" className="btn btn-primary">Add a book</Link>
    </div>
  );
}
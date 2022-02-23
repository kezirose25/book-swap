import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';

import BookDetail from './views/BookDetail.js';
import BookList from './views/BookList.js';
import Error404View from './views/Error404View.js';
import HomeView from './views/HomeView.js';
import MyBooks from './views/MyBooks.js';
import MyMessages from './views/MyMessages.js';
import NewBookForm from './views/NewBookForm.js';

function App() {
  // const [date, setDate] = useState("");
  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(1); // Proxy for logged-in user
  
  // const updateDateTime = () => {
  //   let currentdate =  new Date(); 
  //   let updatedDateTime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  //   setDate(updatedDateTime);
  // }

  useEffect(() => {
    getBooks();
  }, []);

  // GET all books
  async function getBooks() {
    try {
      let response = await fetch("/books");
      if (response.ok) {
        let books = await response.json();
        setBooks(books);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // ADD new book
  function addNewBook(newBook) {
    newBook.addedby = currentUser;
    console.log(newBook);
    console.log('It worked!')
  }

  return (
    <div className="App">
        <Navbar />

        <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="books" element={<BookList books={books}/>} />
                <Route path="mybooks" element={<MyBooks books={books} currentUser={currentUser}/>} />
                <Route path="mybooks/addnew" element={<NewBookForm addBookCB={(newBook) => addNewBook(newBook)}/>} />
                <Route path="mymessages" element={<MyMessages />} />
                <Route path="books/:id" element={<BookDetail books={books} />} />

                <Route path="*" element={<Error404View />} />
        </Routes>

      {/* <p>
          <button onClick={() => updateDateTime()}>Update time & date</button>
          Current date/time: {date}
      </p> */}
    </div>
  );
}

export default App;

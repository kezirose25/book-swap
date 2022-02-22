import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList.js'

function App() {
  const [date, setDate] = useState("");
  const [books, setBooks] = useState([]);
  const [highlightedBook, setHighlightedBook] = useState("");
  
  const updateDateTime = () => {
    let currentdate =  new Date(); 
    let updatedDateTime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    setDate(updatedDateTime);
  }

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

  return (
    <div className="App">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
        <button class="nav-link active" id="viewallbooks-tab" data-bs-toggle="tab" data-bs-target="#viewallbooks" type="button" role="tab" aria-controls="home" aria-selected="true">View all books</button>
        </li>
  
        <li class="nav-item" role="presentation">
        <button class="nav-link" id="mybooks-tab" data-bs-toggle="tab" data-bs-target="#mybooks" type="button" role="tab" aria-controls="profile" aria-selected="false">My Books</button>
        </li>
        
        <li class="nav-item" role="presentation">
        <button class="nav-link" id="mymessages-tab" data-bs-toggle="tab" data-bs-target="#mymessages" type="button" role="tab" aria-controls="contact" aria-selected="false">My Messages</button>
        </li>
      </ul>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="viewallbooks" role="tabpanel" aria-labelledby="viewallbooks-tab"><BookList books={books}/></div>
      <div class="tab-pane fade" id="mybooks" role="tabpanel" aria-labelledby="mybooks-tab"><h1>This is my books</h1></div>
      <div class="tab-pane fade" id="mymessages" role="tabpanel" aria-labelledby="mymessages-tab"><h1>This is my messages</h1></div>
</div>
        

      <p>
          
          <button onClick={() => updateDateTime()}>Update time & date</button>
          Current date/time: {date}
      </p>
    </div>
  );
}

export default App;

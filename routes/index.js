var express = require('express');
var router = express.Router();
const db = require("../model/helper");
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

// ROUTES FOR USERS TABLE
router.get("/users", (req, res) => {
  db("SELECT * FROM users;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// ROUTES FOR BOOKS TABLE

// Get all books ORIGINAL
// router.get("/books", (req, res) => {
//   db("SELECT * FROM books;")
//     .then(results => {
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
// }); 

// Get all books AMENDED
router.get("/books", (req, res) => {
  db(`SELECT books.*, users_faved_books.userid
      AS isfave
      FROM books  
      LEFT JOIN users_faved_books
      ON Books.bookid = users_faved_books.bookid;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//change select to do left join on junction tbl to check book is there. If user id is there, book is faved
// SELECT books.*, junctiontable.userid AS isfave (null if book not faved) FROM books LEFT JOIN junctbl ON books.bookid = junctb.bookid (if found, userid =1)

// Get book by ID
router.get("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let sqlCheckID = `SELECT Books.*, Users.username, Users.wishlist 
                    FROM books 
                    JOIN Users ON Books.Addedby = Users.UserID
                    WHERE bookid = ${id}`;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      res.send(result.data[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add new book
router.post("/books", async (req, res) => {
  let { addedby, title, authors, imgurl, isbn, genre, summary, bookcondition } = req.body;
  let sql = `insert into books (addedby, title, authors, imgurl, isbn, genre, summary, bookcondition) 
            values (${addedby}, '${title}', '${authors}', '${imgurl}', '${isbn}', '${genre}', '${summary}', '${bookcondition}')`;
    try {
    await db(sql);
    let result = await db("select * from books");
    let books = result.data;
    res.status(201).send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Edit book
router.put("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let { addedby, title, authors, imgurl, isbn, genre, summary, bookcondition } = req.body;
  let sqlCheckID = `SELECT * FROM books WHERE bookid = ${id}`;
  let sqlUpdate = `
    UPDATE books SET 
    addedby = ${addedby},    
    title = '${title}',
    authors = '${authors}',
    imgurl = '${imgurl}', 
    isbn = '${isbn}',
    genre = '${genre}',
    summary = '${summary}',
    bookcondition = '${bookcondition}' 
    WHERE bookid = ${id};
  `;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      await db(sqlUpdate);
      let result = await db("select * from books");
      let books = result.data;
      res.status(201).send(books);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete book
router.delete("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let sqlCheckID = `SELECT * FROM books WHERE bookid = ${id}`;
  let sqlDelete = `DELETE FROM books WHERE bookid = ${id}`;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      await db(sqlDelete);
      let result = await db("select * from books");
      let books = result.data;
      res.status(201).send(books);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ROUTES FOR MESSAGES TABLE

// Get all messages
router.get("/messages", (req, res) => {
  let sqlGetMessages = `SELECT Messages.*, fromUsers.username AS sendername, toUsers.username AS recipientname
                        FROM Messages 
                        JOIN (users AS fromUsers) ON (Messages.Sender = fromUsers.userid) 
                        JOIN (users AS toUsers) ON (Messages.Recipient = toUsers.userid)
                        ORDER BY timestamp DESC`
  db(sqlGetMessages)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// Add new message
router.post("/messages", async (req, res) => {
  let { messagesubject, body, sender, recipient } = req.body;
  let sqlPost = `insert into messages (messagesubject, body, sender, recipient) 
            values ('${messagesubject}', '${body}', ${sender}, ${recipient})`;
  let sqlGetMessages = `SELECT Messages.*, fromUsers.username AS sendername, toUsers.username AS recipientname
            FROM Messages 
            JOIN (users AS fromUsers) ON (Messages.Sender = fromUsers.userid) 
            JOIN (users AS toUsers) ON (Messages.Recipient = toUsers.userid)
            ORDER BY timestamp DESC`
  try {
    await db(sqlPost);
    let result = await db(sqlGetMessages);
    let messages = result.data;
    res.status(201).send(messages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete message
router.delete("/messages/:message_id", async (req, res) => {
  let id = req.params.message_id;
  let sqlCheckID = `SELECT * FROM messages WHERE messageid = ${id}`;
  let sqlDelete = `DELETE FROM messages WHERE messageid = ${id}`;
  let sqlGetMessages = `SELECT Messages.*, fromUsers.username AS sendername, toUsers.username AS recipientname
            FROM Messages 
            JOIN (users AS fromUsers) ON (Messages.Sender = fromUsers.userid) 
            JOIN (users AS toUsers) ON (Messages.Recipient = toUsers.userid)
            ORDER BY timestamp DESC`
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Message not found!" });
    } else {
      await db(sqlDelete);
      let result = await db(sqlGetMessages);
      let messages = result.data;
      res.status(201).send(messages);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ROUTES FOR USER_SAVED_BOOKS TABLE

// async function sendAllFaved(res) {
//   let results = await db('SELECT * FROM users_faved_books');
//   res.send(results.data);
// }

// get all faved from junction table
// router.get('/saved', async function(req, res) {
//   try {
//     sendAllSaved(res);
//   } catch (err) {
//     res.status(500).send({error: err.message});
//   }
// });

async function ensureUserExists(req, res, next) {
  try {
    let results = await db(`SELECT * FROM Users WHERE userid = ${req.params.user_id}`);
    if (results.data.length === 1) {
      res.locals.user = results.data[0];
      next();
    } else {
      res.status(404).send({errror: "not found"});
    }
  } catch (err) {
    res.status(500).send({error: err.message});
  }
}

// get faved books from junction table by user id
function joinToJson(results) {
  console.log("test", results);
  let row0 = results.data[0];
  let books = [];
  if (row0.bookid) {
    books = results.data.map(b => ({
      bookid: b.bookid,
      addedby: b.addedby,
      title: b.title,
      authors: b.authors,
      imgurl: b.imgurl,
      isbn: b.isbn,
      genre: b.genre,
      summary: b.summary
    }));
  }
  let user = {
    userid: row0.userid,
    username: row0.username,
    books
  };
  return user;
}

router.get('/users/:user_id', ensureUserExists, async function(req, res) {
  let user = res.locals.user;
  try {
    let sql = `
    SELECT b.*, u.userid AS userid, b.bookid AS bookid
    FROM Users AS u
    LEFT JOIN users_faved_books AS ufb ON u.userid = ufb.userid
    LEFT JOIN Books AS b ON ufb.bookid = b.bookid
    WHERE u.userid = ${user.userid}`
    ;
    let results = await db(sql);
    user = joinToJson(results);
    res.send(user);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

// POST userid and bookid to junction table - by user id that's logged in
router.post('/users/:user_id/fave', async function(req, res){
  let user_id = req.params.user_id;
  let {bookid} = req.body;
  let sql = `
  INSERT INTO users_faved_books (userid, bookid)
  VALUES (${user_id}, ${bookid});
  `;
  console.log("test", req.body);
  try {
    let results = await db(sql);
    // user = joinToJson(results);
    // res.send(user);
    res.send("Added to faves");
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});


// DELETE bookid and userid from junction table

router.delete("/users/:user_id/fave/:book_id", async (req, res) => {
  let book_id = req.params.book_id;
  let user_id = req.params.user_id;
  let sqlCheckID = `SELECT * FROM users_faved_books WHERE bookid = ${book_id} AND userid = ${user_id}`;
  let sqlDelete = `DELETE FROM users_faved_books WHERE bookid = ${book_id} AND userid = ${user_id}`;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      await db(sqlDelete);
      let result = await db(`SELECT * from users_faved_books WHERE userid = ${user_id}`);
      let books = result.data;
      res.status(201).send(books);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



module.exports = router;

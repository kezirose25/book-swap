var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

// Get all books
router.get("/books", (req, res) => {
  db("SELECT * FROM books;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// Get book by ID
router.get("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let sqlCheckID = `SELECT * FROM books WHERE bookid = ${id}`;
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
  let { addedby, title, authors } = req.body;
  let sql = `insert into books (addedby, title, authors) values (${addedby}, '${title}', '${authors}')`;

  try {
    await db(sql);
    let result = await db("select * from books");
    let items = result.data;
    res.status(201).send(items);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

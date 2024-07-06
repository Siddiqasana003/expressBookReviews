const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const doesExist = (username) => {
        let userswithsamename = users.filter((user) => {
            return user.username === username;
        });
        if (userswithsamename.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    if (username && password) {
        if (!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[isbn][author])
    },6000)})
console.log("Before calling promise");
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
  console.log("After calling promise");
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[isbn])
    },6000)})
console.log("Before calling promise");
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
  console.log("After calling promise");
 }
);
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify({booksbyauthor}, null, 4));
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({booksbyauthor})
    },6000)})
console.log("Before calling promise");
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
  console.log("After calling promise");
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booksbytitle.push({"isbn":isbn,
                            "author":books[isbn]["author"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify({booksbytitle}, null, 4));
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({booksbytitle})
    },6000)})
console.log("Before calling promise");
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
  console.log("After calling promise");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
 const isbn = req.params.isbn;
 let book_review = books[isbn]["reviews"];
 res.send(book_review);
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({book_review})
    },6000)})
console.log("Before calling promise");
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
  console.log("After calling promise");
})

module.exports.general = public_users;

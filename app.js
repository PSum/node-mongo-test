// file: app.js
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://netninja:test1234@net-ninja-tuts-del96.mongodb.net/node-tuts";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).send({ error: 'Not Found' });
});
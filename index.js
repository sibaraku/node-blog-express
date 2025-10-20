const express = require('express');

const app = express();
app.use(express.json());

const { getPosts, createPost, getPostById, updatePost, publishPost, deletePost } = require('./controllers/posts')

app.get('/posts', (req, res) => getPosts(req, res));

app.post('/posts', (req, res) => createPost (req, res));

app.get('/posts/:id', (req, res) => getPostById(req, res));

app.put('/posts/:id', (req, res) => updatePost(req, res));

app.patch('/posts/:id/publish', (req, res) => publishPost(req, res));

app.delete('/posts/:id', (req, res) => deletePost(req, res));

app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
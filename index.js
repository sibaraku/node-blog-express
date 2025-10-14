const express = require('express');

const app = express();
app.use(express.json());

const posts = require('./data')

app.get('/posts', (req, res) => {
    res.json(posts);
})

app.post('/posts', (req, res) => {
    const {title, content, author} = req.body;
    if(!title || !content || !author) {
        res.status(400).json({ message: 'Title, content and author are required' });
        return;
    }
    const newPost = {};
    newPost.title = title;
    newPost.content = content;
    newPost.author = author;
    newPost.published = false;
    newPost.createdAt = newDate().toISOString();
    newPost.updatedAt = newDate().toISOString();
    if(posts.length > 0) {
        newPost.id = posts[posts.length - 1].id + 1;
    } else {
        newPost.id = 1;
    }
    posts.push(newPost);
    res.status(201).json(newPost);
})

app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find( (post) => {
        return post.id === id && post.published === true;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    } 
    res.status(200).json(post);
});
//sdelat doma!!!
app.patch('/posts/:id/publish', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find( (post) => {
        return post.id === id && post.published === true;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    } 
    res.status(200).json(post);
});

app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex( (post) => {
        return post.id === id;
    });
    if(postIndex === -1) {
        res.status(404).json({ message: 'Post not found' });
        return;
    } 
    posts.splice(postIndex, 1);
    res.status(204).json();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3002')
});
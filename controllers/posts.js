const posts = require('../data');

const getPosts = (req, res) => {
    const publishedPosts = posts.filter( (post) => {
        return post.published === true;
    });
    res.status(200).json(publishedPosts);
}

const createPost = (req, res) => {
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
    newPost.createdAt = new Date().toISOString();
    newPost.updatedAt = new Date().toISOString();
    if(posts.length > 0) {
        newPost.id = posts[posts.length - 1].id + 1;
    } else {
        newPost.id = 1;
    }
    posts.push(newPost);
    res.status(201).json(newPost);
}

const getPostById = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find( (post) => {
        return post.id === id && post.published === true;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.status(200).json(post);
}

const updatePost = (req, res) => {
    const {title, content, author} = req.body;
    if(!title || !content || !author) {
        res.status(400).json({ message: 'Title, content and author are required' });
        return;
    }
    const id = parseInt(req.params.id);
    const post = posts.find( (post) => {
        return post.id === id;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    post.title = title;
    post.content = content;
    post.author = author;
    post.updatedAt = new Date().toISOString();
    res.status(200).json(post);
}

const publishPost = (req, res) => {
    const {published} = req.body;
    if(!published) {
        res.status(400).json({ message: 'published is required' });
        return;
    }
    const id = parseInt(req.params.id);
    const post = posts.find( (post) => {
        return post.id === id;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    post.published = published;
    post.updatedAt = new Date().toISOString();
    res.status(200).json(post);
}

const deletePost = (req, res) => {
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
}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    publishPost,
    deletePost
};
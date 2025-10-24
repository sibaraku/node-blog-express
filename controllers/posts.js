const { readFile, writeFile } = require('../utils/files'); 


const initPost = async() => {
    const posts = await readFile("./data/posts.json")
    if (posts === null){
        return []
    }
    return posts
}


const getPosts = async(req, res) => {
    const posts = await initPost();
    const publishedPosts = posts.filter( (post) => {
        return post.published === true;
    });   
    res.status(200).json(publishedPosts);
}

const createPost = async (req, res) => {
    const {title, content, author} = req.body;
    if(!title || !content || !author) {
        res.status(400).json({ message: 'Title, content and author are required' });
        return;
    }
    const newPost = {};
    const posts = await initPost();
    if(posts.length > 0) {
        newPost.id = posts[posts.length - 1].id + 1;
    } else {
        newPost.id = 1;
    }
    newPost.title = title;
    newPost.content = content;
    newPost.author = author;
    newPost.published = false;
    newPost.createdAt = new Date().toISOString();
    newPost.updatedAt = new Date().toISOString();
    
    posts.push(newPost);
    await writeFile('./data/posts.json', posts);
    res.status(201).json(newPost);
}

const getPostById =  async (req, res) => {
    const id = parseInt(req.params.id);
    const posts = await initPost();
    const post = posts.find( (post) => {
        return post.id === id && post.published === true;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.status(200).json(post);
}

const updatePost = async (req, res) => {
    const {title, content, author} = req.body;
    if(!title || !content || !author) {
        res.status(400).json({ message: 'Title, content and author are required' });
        return;
    }
    const id = parseInt(req.params.id);
    const posts = await initPost();
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
    await writeFile('./data/posts.json', posts);
    res.status(200).json(post);
}

const publishPost = async (req, res) => {
    const {published} = req.body;
    if(!published) {
        res.status(400).json({ message: 'published is required' });
        return;
    }
    const id = parseInt(req.params.id);
    const posts = await initPost();
    const post = posts.find( (post) => {
        return post.id === id;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    post.published = published;
    post.updatedAt = new Date().toISOString();
    await writeFile('./data/posts.json', posts);
    res.status(200).json(post);
}

const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const posts = await initPost();
    const postIndex = posts.findIndex( (post) => {
        return post.id === id;
    });
    if(postIndex === -1) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    posts.splice(postIndex, 1);
    await writeFile('./data/posts.json', posts);
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
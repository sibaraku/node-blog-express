const express = require("express");

const app = express();
app.use(express.json());

const postsRoutes = require('./routes/posts.js')
app.use('/posts', postsRoutes)

app.listen(3001, () => {
  console.log("Server is running at http://localhost:3002/")
});
var mongoose = require("mongoose");
var Blog = require("../models/blog");

/*
 * GET / route to retrieve all the blogs.
 */
function getBlogs(req, res) {
  Blog.find({}, (err, blogs) => {
    res.render("index", { blogs: blogs})
  });
}

/*
 * POST /addpost to save a new blog.
 */
function postBlog(req, res) {
  //Creates a new blog
  var blogData = new Blog(req.body);
  //Save it into the DB.
  blogData.save().then(() => {
    res.redirect("/");
  }).catch(err => {
    res.status(400).send("Unable to save data");
  });
}

/*
 * GET /blog/:id route to retrieve a blog given its id.
 */
function getBlog(req, res) {
  Blog.findById(req.params.id, (err, blog) => {
    if(err) res.send(err);
    // If no errors, send it back to the client
    res.json(blog);
  });
}

/*
 * DELETE /blog/:id to delete a blog given its id.
 */
function deleteBlog(req, res) {
  Blog.deleteOne({_id : req.params.id}).then(() => {
    res.redirect("/");
  }).catch(err => {
    res.status(400).send("Unable to delete data");
  });
}

//export all the functions
module.exports = { getBlogs, postBlog, getBlog, deleteBlog };

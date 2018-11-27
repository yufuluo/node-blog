// Setup
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var blog = require("./routes/blog");
var config = require("config"); //we load the db location from the JSON files
//db options
var options = {
                keepAlive: 1,
                connectTimeoutMS: 30000,
                useNewUrlParser: true
              };

//db connection
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Routes
app.route("/")
    .get(blog.getBlogs);

app.route("/addpost")
    .post(blog.postBlog);

app.route("/blog/:id")
    .get(blog.getBlog)
    .delete(blog.deleteBlog);


// Listen to the port ONLY when it's not in test mode
if(!module.parent) {
  app.listen(config.port, () => {
    console.log("Listening on port " + config.port);
  });
}

module.exports = {
  app
};

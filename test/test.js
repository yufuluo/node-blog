//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Blog = require("../models/blog");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const {app} = require("../app");
const expect = chai.expect;

//should we delete the database after the test run?
const deleteAfterRun = true;

chai.use(chaiHttp);
//Our parent block
describe("Blogs", () => {

  // Drop the DB after finishing all the tests
  after((done) => {
    if (deleteAfterRun) {
      console.log("Deleting test database");
      mongoose.connection.db.dropDatabase(function(err, result) {
        console.log('test database dropped');
        done();
        process.exit(0);
      });
    } else {
      done();
      process.exit(0);
    }

    // server.close(() => {
    //   done();
    //   process.exit(0);
    // });
  });
/*
* Test the /GET route
*/
  it("it should GET all the blogs", (done) => {
    chai.request(app)
        .get("/")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include("<h1>Node Blog</h1>");
          expect(res.text).to.not.include("Delete");
          done();
      });
  });

/*
* Test the /POST route
*/
  it("it should POST a blog ", (done) => {
    let blog = {
      body: "This is a test msg"
    }
    chai.request(app)
        .post("/addpost")
        .send(blog)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.be.a("string");
          expect(res.text).to.include(blog.body);
          done();
        });
  });

/*
* Test the /DELETE route
*/
  it("it should DELETE a blog given the id", (done) => {
    let blog = new Blog({body: "This is another test msg"});
    blog.save(() => {
      chai.request(app)
        .delete("/blog/" + blog._id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.be.a("string");
          expect(res.text).to.not.include(blog.body);
          done();
      });
    });
  });
});

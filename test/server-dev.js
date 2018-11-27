//During the test the env variable is set to test
// process.env.NODE_ENV = "test";

const url = "http://node-blog-dev.nodetest.com";

const mongoose = require("mongoose");
const Blog = require("../models/blog");

//Require the modules for tests
const fetch = require("node-fetch");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

//should we delete the database after the test run?
const deleteAfterRun = true;

let id = "";

describe("Server Dev", () => {

  after((done) => {
    done();
    process.exit(0);
  });

  /*
  * Test the /GET route
  */
  it("it should GET all the blogs", (done) => {
    fetch(url + "/")
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.headers.get("content-type")).to.include("html");
      return res.text();
    }).then((body) => {
      expect(body).to.include("<h1>Node Blog</h1>");
      done();
    }).catch((err) => {
      console.log(err);
      done(err);
    });
  });

  /*
  * Test the /POST route
  */
  it("it should POST a blog ", (done) => {
    let blog = new Blog({body: "This is a test msg"});
    id = blog._id;

    fetch(url + "/addpost", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      expect(res).to.have.status(200);
      return res.text();
    }).then((body) => {
      expect(body).to.include(blog.body);
      done();
    }).catch((err) => {
      console.log(err);
      done(err);
    });
  });

  /*
  * Test the /DELETE route
  */
  it("it should DELETE a blog given the id", (done) => {
    fetch(url + "/blog/" + id, {
      method: "DELETE",
      redirect: 'manual'
    }).then((res) => {
      expect(res).to.have.status(302);
      return fetch(url);
    }).then((res) => {
      return res.text();
    }).then((res) => {
      expect(res).not.to.include(id);
      done();
    }).catch((err) => {
      console.log(err);
      done(err);
    });
  });

});

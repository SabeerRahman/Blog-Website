const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
let postRoutes = express.Router();
let db = database.getDb();

// 5 Basic Routes

// 1. Retrieve All
// it will be considered as http://localhost:3000/posts
postRoutes.route("/posts").get(async (request, response) => {
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found");
  }
});
// 2. Retrieve One
postRoutes.route("/posts/:id").get(async (request, response) => {
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found");
  }
});
// 3. Create
postRoutes.route("/posts").post(async (request, response) => {
  let mongoObject = {
    title: request.params.title,
    description: request.params.description,
    content: request.params.content,
    author: request.params.author,
    dateCreated: request.params.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject);
  response.json(data);
});
// 4. Update
postRoutes.route("/posts/:id").put(async (request, response) => {
  let mongoObject = {
    $set: {
      title: request.params.title,
      description: request.params.description,
      content: request.params.content,
      author: request.params.author,
      dateCreated: request.params.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});
// 5. Delete
postRoutes.route("/posts/:id").delete(async (request, response) => {
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

module.exports = postRoutes;

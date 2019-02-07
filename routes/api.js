const router = require("express").Router();
const Book = require("../models/Book.js");

router.post("/api/books", function(req, res) {
  Book.create(req.body)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err)
  });
});

router.get("/api/books", function(req, res) {
  Book.find().then((docs) => {
    res.json(docs);
  });
});

router.delete("/api/books/:id", function(req, res) {
  Book.remove({"_id": req.params.id})
  .then(() => {
    res.end()
  })
  .catch((err) => {
    res.json(err)
  });
});

module.exports = router;
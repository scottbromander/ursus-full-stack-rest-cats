const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/", (req, res) => {
  const queryString = `INSERT INTO "cats" ("name") VALUES ($1);`;

  console.log(req.body.cat);

  pool
    .query(queryString, [req.body.cat])
    .then(response => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.warn(err);
      res.send(500);
    });
});

router.get("/", (req, res) => {
  const queryString = `SELECT * FROM "cats"`;

  pool
    .query(queryString)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.warn(err);
      res.send(500);
    });
});

router.put("/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const queryString = `DELETE FROM "cats" WHERE id=$1;`;

  pool
    .query(queryString, [req.params.id])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.warn(err);
      res.send(500);
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/", (req, res) => {
  const queryString = `INSERT INTO "cats" ("name") VALUES ($1);`;

  pool
    .query(queryString, [req.body.cat])
    .then(response => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  const queryString = `SELECT * FROM "cats" ORDER BY "id"`;

  pool
    .query(queryString)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  let newOwned = true;

  if (req.body.owned == "true") {
    newOwned = false;
  } else {
    newOwned = true;
  }

  const queryString = `UPDATE "cats" SET "owned"=$1 WHERE id=$2;`;

  pool
    .query(queryString, [newOwned, req.params.id])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const queryString = `DELETE FROM "cats" WHERE id=$1;`;

  pool
    .query(queryString, [req.params.id])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;

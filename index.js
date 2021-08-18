const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "test",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM todo";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const todoName = req.body.todoName;
  const description = req.body.description;
  const status = req.body.status;
  const sqlInsert =
    "INSERT INTO todo (id,nameTodo, description, status) VALUES (2, ?,?,?)";

  db.query(sqlInsert, [todoName, description, status], (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM todo WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  const sqlUpdate = "UPDATE todo SET status = ? WHERE id = ? ";
  db.query(sqlUpdate, [status, id], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

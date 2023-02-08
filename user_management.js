const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let users = [
  {
    id: 1,
    username: "perez",
    password: "1234"
  },
  {
    id: 2,
    username: "gomez",
    password: "5678"
  }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    username: req.body.username,
    password: req.body.password
  };
  users.push(user);
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.username = req.body.username;
  user.password = req.body.password;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(userIndex, 1);
  res.send("User deleted");
});

const port = 3000;
app.listen(port, () => console.log(`User management app listening on port ${port}!`));
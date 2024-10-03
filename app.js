const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let tasks = [];
let name = "";
let darkMode = false;

// Get the homepage
app.get("/", (req, res) => {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const progress = tasks.length
    ? (completedTasks.length / tasks.length) * 100
    : 0;
  res.render("index", {
    tasks,
    name,
    pendingTasks,
    completedTasks,
    progress,
    darkMode,
  });
});

// Add a new task
app.post("/add-task", (req, res) => {
  tasks.push({ id: Date.now(), name: req.body.task, completed: false });
  res.redirect("/");
});

// Edit task
app.post("/edit-task/:id", (req, res) => {
  const task = tasks.find((task) => task.id == req.params.id);
  task.name = req.body.updatedTask;
  res.redirect("/");
});

// Mark task completed or pending
app.post("/toggle-complete/:id", (req, res) => {
  const task = tasks.find((task) => task.id == req.params.id);
  task.completed = !task.completed;
  res.redirect("/");
});

// Delete task
app.post("/delete-task/:id", (req, res) => {
  tasks = tasks.filter((task) => task.id != req.params.id);
  res.redirect("/");
});

// Set user name
app.post("/set-name", (req, res) => {
  name = req.body.name;
  res.redirect("/");
});

// Toggle dark mode
app.post("/toggle-dark-mode", (req, res) => {
  darkMode = !darkMode;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const ToDo = require("../models/toDoModel");

const todos = [];

const todoController = {
  getAllTodos(req, res) {
    res.render("index", { todos });
  },

  createToDoForm(req, res) {
    res.render("create");
  },

  createToDoItem(req, res) {
    const { title } = req.body;
    const todo = new ToDo();
    todo.id = todo.length + 1;
    todo.title = title;
    todos.push(todo);
    res.redirect("/");
  },

  completeToDoItem(req, res) {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = true;
    }
    res.redirect("/");
  },
};

module.exports = todoController;

const express = require("express");
const todoController = require("./controllers/toDoController");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.get("/", todoController.getAllTodos);
app.get("/create", todoController.createToDoForm);
app.post("/create", todoController.createToDoItem);
app.get("/complete/:id", todoController.completeToDoItem);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

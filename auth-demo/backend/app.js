const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); //this is the way to include view engine - ejs
app.set("views", __dirname + "/views"); //this is the way to include views
app.use(express.urlencoded({ extended: true })); //if not included,req.body will not hold any data

app.use(
  //this is th way to use session
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

const authenticate = (req, res, next) => {
  //authentication middleware
  if (req.session.isAuthenticated) {
    //if user is authenticated,pass it on next session,else view login page
    next();
  } else {
    res.redirect("/login");
  }
};

const users = [
  //dummy users
  {
    username: "john123",
    password: "john123",
    role: "student",
  },
  {
    username: "usha123",
    password: "usha123",
    role: "teacher",
  },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  ); //method to authenticate username and password
  if (user) {
    req.session.isAuthenticated = true;
    req.session.userRole = user.role;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) =>
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  })
);

app.get("/studentView", authenticate, (req, res) => {
  if (req.session.isAuthenticated && req.session.userRole === "student") {
    res.render("studentView");
  } else {
    res.redirect("/login");
  }
});

app.get("/facultyView", authenticate, (req, res) => {
  if (req.session.isAuthenticated && req.session.userRole === "teacher") {
    res.render("facultyView");
  } else {
    res.redirect("/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server is runnning on port: ${PORT}`);
});

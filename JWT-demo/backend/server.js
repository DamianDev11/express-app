const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const secret = "mysecretkey";

//middleware
app.use(bodyParser.json()); //we can use it instead of express.urlencoded
app.use(express.urlencoded({ extended: true }));

//dummy users
const users = [
  {
    id: 1,
    username: "john",
    password: "john123",
  },
  {
    id: 2,
    username: "usha",
    password: "usha123",
  },
];

//routes - signup API created
app.post("/signup", (req, res) => {
  const { username, password } = req.body; //extracting username and password from the url
  const id = users.length + 1;
  users.push({ id, username, password });
  res.status(201).json({ message: "User created successfully!" });
});

//login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    res.status(401).json({ message: "Invalid Credentials" });
  }

  //generate token
  const token = jwt.sign({ id: user.id, username: user.username }, secret, {
    expiresIn: "10h",
  });
  res.json({ token });
});

//Protected Routes
app.get("/protected", vertifyToken, (req, res) => {
  res.json({ message: "Protected route accessed!" });
});

function vertifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; //authorization will contain Bearer and token value
  if (!token) {
    res.status(401).json({ message: "No token provided!" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token!" });
    }
    req.user = decoded;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port"${PORT}`);
});

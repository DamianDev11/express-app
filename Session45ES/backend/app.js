import Express from "express";

const app = Express();
const PORT = 3000;

app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

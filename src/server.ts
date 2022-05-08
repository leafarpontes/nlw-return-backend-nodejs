import express from "express";

const app = express();
const port = 3333;

app.get('/users', (req, res) => {
  res.json({
    name: "carlos",
    age: 26
  });
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
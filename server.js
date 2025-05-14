import main from "./script.js";
import express from "express";
const app = express();
const port = 3000;

app.get("/licitaciones", async (req, res) => {
  const results = await main(req.query?.dias || 1);
  return res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

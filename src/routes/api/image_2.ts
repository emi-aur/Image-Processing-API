import express from "express";
const image_2 = express.Router();

image_2.get("/", (req, res) => {
  res.send("image_1");
});

export default image_2;

import express from "express";
import image_1 from "./api/images";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("main image");
});

routes.use("/image_1", image_1);

export default routes;

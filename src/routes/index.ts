import express from "express";
import images from "./api/images";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("main image");
});

routes.use("/images", images);

export default routes;

import express from "express";
import routes from "./routes/index";
const app = express();
const port = 3000;

app.use("/api", routes);

// Only start the server if not being imported for testing
if (require.main === module) {
  app.listen(port, (): void => {
    console.log(`Server is running at localhost:${port}`);
  });
}

export default app;

import dotenv from "dotenv";
import connectDB from "./DB/db.js";
import app from "./app.js"

dotenv.config();

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on ${port} port`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });

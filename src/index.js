import app from "./app";
import connectDb from "./db/dbConnection";
import dotenv from "dotenv";

dotenv.config();

// connectDb function will return a promise
connectDb()
  .then(() => {
    app.listen(process.env.PORT, (params) => {
      console.log(`App is listening on Port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database Connection Error  ${error}`);
    process.exit(1);
  });

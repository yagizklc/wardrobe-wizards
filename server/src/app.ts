import express from "express";
import auth from "./routes/auth";
import product from "./routes/product"
import images from "./routes/images";
import dotenv from "dotenv"
import connectDb from "./config/dbConnection"
dotenv.config()

connectDb();
const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use(auth);
app.use(product);
app.use(images)

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

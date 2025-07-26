import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/dbConnect.js";
import userRouter from "./routes/userRoute.js";

// port no
const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to bg-removal",
  });
});

app.use("/api/user", userRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("server is running on PORT : " + PORT);
  });
};

startServer();

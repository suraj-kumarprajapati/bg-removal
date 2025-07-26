

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/dbConnect.js';

// port no
const PORT = process.env.PORT || 5000;
const app = express();
await connectDB();


// middlewares
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.json(200).json({
        message : 'welcome to bg-removal';
    });
});



app.listen(PORT, () => {
    console.log("server is running on PORT : " + PORT);
});
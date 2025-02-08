const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');

dotenv.config();


const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });


    app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
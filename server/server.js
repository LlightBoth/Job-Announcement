require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();

// Import routes
const jobRoutes = require("./routes/jobRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const companyRoutes = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


// Import environment
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({  
                origin: ["http://localhost:5501", "http://127.0.0.1:5501"],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            })
        );
app.use('/job', jobRoutes);
app.use('/category', categoryRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);


// Endpoint
app.get("/", (req, res) => {
    res.send("Job Announcement API is running");
});

app.listen(PORT, () => {
    console.log("The server started.");
})
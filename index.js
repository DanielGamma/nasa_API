const express = require("express");
const app = express();

require("dotenv").config();

const PORT = 3000;

// Middlewares:
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes:
const landingRoutes = require('./routes/landings_routes');

app.use('/api/landings', landingRoutes);

const connectDB = require("./config.js");

app.listen(PORT, () => {
    connectDB(process.env.MONGO_DB_URI)
        .then(() => console.log(`Server listening on port ${PORT}...`))
        .catch(error => console.log(error));
    ;
});
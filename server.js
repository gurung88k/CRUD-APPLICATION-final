const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require("method-override");

const app = express();

dotenv.config({ path: 'config.env' });
const connectDB = require('./server/database/connection');
connectDB();

const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

// ✅ Replace body-parser with built-in Express parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Enable method override
app.use(methodOverride("_method"));

// ✅ Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Serve static assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// ✅ Mount routes
const router = require('./server/routes/router');
app.use('/', router);

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

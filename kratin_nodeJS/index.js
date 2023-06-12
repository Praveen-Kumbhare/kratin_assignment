const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
require('./src/config/dbConnect');
const ap = require('./src/app/app')

const app = express();
const PORT = 4000;

app.use(cors());
app.use(morgan('dev'))
app.use('/', ap);
app.listen(PORT, ()=> console.log(`Your server is running on port ${PORT}`));
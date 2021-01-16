const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

//app
const app = express();

//bring routes
const authRoutes = require('./Routes/auth');
const patch = require('./Routes/json-patch');
const address = require('./Routes/address')
const thumbnail = require('./Routes/image')
//database
mongoose
  .connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database connected'))
  .catch(() => console.error('database connection failed'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

//routes middlewares
app.use(authRoutes);
app.use(patch)
app.use(address)
app.use(thumbnail)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});
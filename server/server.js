const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan("dev"));
const routes = require('./routes/index');


app.use(bodyParser.json());
app.use(cors({origin:"*",methods:"*",allowedHeaders:['Content-Type', 'Authorization'],credentials:"*"}));

mongoose.connect(
    'mongodb+srv://ahmednagh:calender_123@cluster0.hpsyvg3.mongodb.net/?retryWrites=true&w=majority&appName=calender',
     { useNewUrlParser: true, useUnifiedTopology: true })
     .then(()=>{
            console.log('Database connected');
     }).catch((err)=>{
            console.error(`error: ${err}`);
     });

app.use('/api', routes);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;    // for testing


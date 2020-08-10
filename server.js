const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//BodyParser  Middleware
app.use(bodyParser.json());

// DB config
const db= require('./config/keys').mongoURI;

//Connect to mongoDB



mongoose.connect(db , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false
}).then(()=>{
   console.log(`connection to database established`)
}).catch(err=>{
   console.log(`db error ${err.message}`);
   process.exit(-1)
})


//Use routes
app.use('/api/items/',items);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
   //Set static folder
   app.use(express.static('client/build'));

   app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   });

}


const port = process.env.PORT || 5000 ;
app.listen(port , ()=>console.log(`Server Started on port ${port}`));








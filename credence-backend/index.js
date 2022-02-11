//Dependencies
let express=require('express');
let cors=require('cors');
let http=require('http');
let {config}=require('dotenv');
let mongoose=require('mongoose');
let routes=require('./routes/v1');
let errorHandler=require('./error/errorHandler');

// load env
config();
// load express
const app=express();

//DB
mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@onkarnode.dlgcp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });


//Creating Server instance
let server={};

app.use(cors());

app.use(express.json());


// Route
app.use('/api/v1',routes);

app.use(errorHandler);
let httpserver=http.createServer(app);

server.init=function(){
    httpserver.listen(process.env.HTTPPORT ,function(){
        console.log(`CONNECTED..... ${process.env.HTTPPORT}!`);
    });
}

server.init();

//Dependencies
let express=require('express');
let cors=require('cors');
let http=require('http');
let {config}=require('dotenv');
let routes=require('./routes/v1');
var db=require('./db');
// load env
config();
// load express
const app=express();

//DB


//Creating Server instance
let server={};

app.use(cors());

app.use(express.json());


// Route
app.use('/api/v1',routes);

let httpserver=http.createServer(app);

server.init=function(){
    httpserver.listen(process.env.HTTPPORT ,function(){
        console.log(`CONNECTED..... ${process.env.HTTPPORT}!`);
    });
}

server.init();

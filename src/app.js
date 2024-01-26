var express = require('express');
// const { createConn } = require('./conection');
// const { default: db } = require('./conection');
// const serverless = require("serverless-http");
// const QuestionModel = require('./modal');
var app = express();
var cors = require('cors');
const mongoose = require('mongoose');
app.use(express.json()); 
app.use(cors()); 
connect();
const router = express.Router();
router.get('/question',async (req,res)=>{
    try{
        const Data = await QuestionModel.find();
        res.status(200).json(Data);
    }
    catch(err){
        console.log(err);
    }
});

async function connect(){
    try{
        
        await mongoose.connect("mongodb+srv://akashrazza:testRaja@cluster0.8gi7hza.mongodb.net/testDB?serverSelectionTimeoutMS=2000",{ useNewUrlParser: true })
        console.log("Connecttion Created")
    }
    catch(err){
        console.log(err);
    }
}
router.post('/question',async (req,res)=>{
    try{
        const Data = await QuestionModel.create(req.body);
        res.status(201).json(Data);
    }
    catch(err){
        console.log(err);
    }
});


//Server Running at 8000 port
// app.use('/.netlify/functions/app', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
// module.exports = app;
// module.exports.handler = serverless(app);
// module.exports.handler = async (event, context) => {
//   const result = await handler(event, context);
//   return result;
// };
// app.listen(8080, () => {
//     console.log(`Server running at http:/`);
// });
app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(3001,'0.0.0.0' () => console.log(`Example app listening on port 3001`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
const QuestionSchema = mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    correct:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    }
})
const QuestionModel = mongoose.model('Question',QuestionSchema);

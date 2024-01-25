var express = require('express');
// const { createConn } = require('./conection');
// const { default: db } = require('./conection');
const serverless = require("serverless-http");
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
app.use('/.netlify/functions/app', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
module.exports = app;
module.exports.handler = serverless(app);
// module.exports.handler = async (event, context) => {
//   const result = await handler(event, context);
//   return result;
// };
// app.listen(8080, () => {
//     console.log(`Server running at http:/`);
// });

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

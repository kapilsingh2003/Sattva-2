const express = require('express');

const app = express();
const cors = require('cors');
const socketio = require("socket.io")
const dotenv = require('dotenv');
const connectDB = require('./database/connect');
const manageToken = require('./ManageToken')
const multer = require('multer');
const fs = require('fs')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.wav')
  }
});
const upload = multer({ storage });

const token = manageToken()

const executeModel = require('./executeModel')
const poseModel = require('./poseCorrectModel');

console.log("THIS IS TOKEN : " + token);

dotenv.config()

const User = require('./models/user')

const Room = require('./models/room')

const PORT = process.env.PORT || 8080;

const URL = process.env.DATABASE_URL;

const accountSid = process.env.TWILIO_APP_SSID
const authToken = process.env.TWILIO_APP_TOKEN

const client = require('twilio')(accountSid, authToken)

let startTime, endTime;

const run = () => {
  client.messages
        .create({
           from: 'whatsapp:+14155238886',
           body: 'Hey! Dont turn back now, 1 session a day will keep you better all day!',
           to: 'whatsapp:+917348445574'
         })
        .then(message => console.log(message.sid))
        .done();
}

const State = require('./models/states');
const user = require('./models/user');

connectDB(URL);

app.use(cors())

app.use(express.json());

app.get("/begin-pose", async (req, res) => {
  poseModel().then(res => console.log(res)).catch(err => console.log(err))
})

const expressServer = app.listen(PORT, () => {
    console.log("Server is running on PORT : " + PORT);
})

let stateObject = {}

app.post("/getUser", async (req, res) => {
  const {userID} = req.body
  try{
  const userObj =await User.findById(userID).populate("states")
  return res.status(200).json({
    user : userObj
  })
  }catch(err){
    console.log(err);
  }
})

app.post("/create-room", async (req, res) => {
  const {token, tag} = req.body
  let room = new Room({
    token,
    tag,
  })
  room = await room.save();
})

app.delete("/delete-room", async (req, res) => {
  const {token} = req.body
  Room.deleteOne({token}).then(response => res.json(response))
})

app.get("/get-rooms", async (req, res) => {
  const room = await Room.find()
  res.status(200).json(room)
})

app.post('/audio/upload', upload.single('audioFile'), (req, res) => {
executeModel(req.file.path).then(response => {
  fs.readFile(`${req.file.path}_results.json`, 'utf-8', async (err, data) => {
    if(err) throw err;
    console.log("Function working");
    const json = JSON.parse(data);
    const dataArray = json[0]
    dataArray.map(data => {
      console.log(data);
      stateObject = {...stateObject, [data.label] : data.score}
    })
    const state = new State({
      ...stateObject,
      date : new Date(),
    });
    let user = await User.findById("63de45ffcee58871e8ec11bc");
    user.states.push(state)
    user = await user.save()

    state.save().then(response => res.status(201).json({
      message: "User Successfully Created",
      response: response,
    }))
    startTime = new Date();
  });
}).catch(err => console.log(err))
})

setInterval(() => {
  endTime = new Date();
  const elapsedTime = end - start;
  const elapsedHours = elapsedTime / 1000 / 60 / 60;

if (elapsedHours >= 10) {
  console.log("10 hours have passed.");
  run()
} 
}, 60 * 60 * 1000)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/userData");

const app = express();
const jsonParser = bodyParser.json();

const mongoUri =
  "mongodb+srv://zahid123:zahid321@predictionserver.gau59.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
    });
    console.log(`Connected to mongoose`);
  } catch (e) {
    console.log("error While Connect to mongoose", e);
  }
};
connectDB();
// Adding Data
app.post("/insertItems", jsonParser, async (req, res) => {
  //   let { name } = req.body;
  const userName = req.body.name;
  const userAge = req.body.age;
  const myData = new User({
    name: userName,
    age: userAge,
  });

  try {
    await myData.save();
    console.log(" stored Data to DataBase");
  } catch (e) {
    console.log("Error while storing Data to DataBase", e);
  }
  res.send("Inserted Data");
});

//readingData
app.get("/read", jsonParser, async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
// updating Data

app.put("/update", jsonParser, async (req, res) => {
  // console.log("From FronEnd update", req.body.updatedUserName);
  //   let { name } = req.body;
  const id = req.body.id;
  console.log("From FronEnd update id", id);

  const updatedUserName = req.body.updatedUserName;
  const updatedAge = req.body.updatedAge;

  try {
    User.findById(id, (err, myUpdatedUser) => {
      myUpdatedUser.name = updatedUserName;
      myUpdatedUser.age = updatedAge;
      myUpdatedUser.save();
    });
  } catch (e) {
    console.log("Error while updating Data in DataBase", e);
  }
  res.send("Inserted Data");
});

/// find one user and update;

app.get("/readone/:id", jsonParser, async (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }, async (err, result) => {
    if (err) {
      console.log("Error while reading one user data against id", err);
    } else {
      console.log("the user against the id is ", result);
      res.send(result);
    }
  });
});

/// deleting Data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log("/delete/:id", id);
  await User.findByIdAndRemove(id).exec();
  res.send("Deleted Data");
});

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("running on port 5000");
});

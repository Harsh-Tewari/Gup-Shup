const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userSchema");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter complete details");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already exists");
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Unable to create user");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the details");
  }

  const user = await User.findOne({ email });

  if (user) {
    if (await user.matchPassword(password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send("Invalid Credentials");
      throw new Error("Invalid Credentials");
    }
  } else {
    res.status(400);
    throw new Error("User does not exist");
  }
});

const allUsers = expressAsyncHandler(async (req, res) => {
  //we are going to use queries hers
  //eg api/user? search=Harsh
  //if we do not use queries, we will have to send the
  //data to backend through body using post request

  //to take param we write req.param
  //to get query we do it as follows
  //const keyword = req.query; //prints everything you sent
  const keyword = req.query.search
    ? {
        //using logical or of mongodB
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).findIndex({ _id: { $ne: req._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };

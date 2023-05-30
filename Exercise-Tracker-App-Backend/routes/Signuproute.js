import express from 'express';

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

import User from "../models/Userdatarmodel.js";

const route = express.Router();

//------------post signup----------------


route.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const encrptPassword = await bcrypt.hash(password,10)
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ message: "User is already registered" });
      console.log("User is already registered")
    } else {
      const newUser = new User({
        name: name,
        email: email,
        password: encrptPassword,
      });
      await newUser.save();
      res.send({ status: "ok" });
      console.log("Signup Successfully and Plaese Login Now!")
    }
  } catch (error) {
    res.send(error);
  }
});

//----------------------------------

export default route;

import express from "express";

import dotenv from "dotenv";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

import User from "../models/Userdatarmodel.js";
dotenv.config();
const route = express.Router();

//------------post login----------------

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: "not found", error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1440m",
    });
    console.log(token)

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

export default route;
import express from 'express';

import jwt from 'jsonwebtoken';

import dotenv from "dotenv";

import UserExercise from '../models/Usermodel.js';
const route = express.Router();
dotenv.config();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token expired' });
    }
    req.user = user;
    next();
  });
};

route.get('/', authenticateToken, (req, res) => {
  UserExercise.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

route.post('/add', authenticateToken, (req, res) => {
  const username = req.body.username;

  const newUser = new UserExercise({ username });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default route;












// import express from 'express';
// import UserExercise from "../models/Usermodel.js"
// const route = express.Router();


// route.get('/',(req, res) => {
//   UserExercise.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// //-------------------------------------------------

// route.post('/add',(req, res) => {
//   const username = req.body.username;

//   const newUser = new UserExercise({username});

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// export default route;
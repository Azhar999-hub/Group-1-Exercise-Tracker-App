import express from "express";
import cors from "cors";
import conncectDB from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());

//----------DataBase Config---------------

conncectDB();

//--------------Routes--------------------

import SignupRouter from './routes/Signuproute.js'
import LoginRouter from './routes/Loginroute.js'
import UserDataRouter from './routes/Userdatarouter.js'
import ExerciseRouter from './routes/Exerciserouter.js'
import UserRouter from './routes/Userrouter.js'

app.use('/signup',SignupRouter)
app.use('/login',LoginRouter)
app.use('/userData', UserDataRouter)
app.use('/exercises', ExerciseRouter)
app.use('/usersexercise',UserRouter )


//-------------Server----------------

app.listen(process.env.PORT, () => {
  console.log("Server is listning on port " + process.env.PORT);
});


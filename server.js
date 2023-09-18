//dependency import
import express from 'express';
import dotenv from 'dotenv'
import "express-async-errors";


//file imports
import ConnectDB from './config/database_connect.js';
import UserRegister from "./routes/UserRoute.js"
import UserLogin from './routes/UserRoute.js';
import UserAuth from './middleware/AuthMiddleware.js';
import ErrorHandler from './middleware/ErrorHandling.js';

//rest operator
const app = express();

//env configuration
dotenv.config()
app.use(express.json()) //request body parser


app.use('/api/v1/auth',UserRegister)
app.use('/api/v1/auth',UserLogin)

//Thats is how you serve an image in node.js server.
app.use('/api/v1/login/public/',express.static('PublicImages'))
app.use('/api/v1/login/private/',UserAuth,express.static('PrivateImages'))

//Error handler middleware initialization
app.use(ErrorHandler);

//Database connection
ConnectDB();

const Port = process.env.PORT||3000
app.listen(Port,()=>{
    console.log(`Server is connected to: ${Port}`);
});
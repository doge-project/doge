import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import routes from './routes';
import { config } from '@config/config';

dotenv.config();
const app = express();
app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(
  '/files',
  express.static(path.resolve(__dirname, 'tmp', 'uploads'))
);
//app.use(cors()); //TODO:

mongoose.connect(`mongodb+srv://deploy:${process.env.MONGO_DB_USER_DEPLOY_PSWD}@cluster0-fbl6v.mongodb.net/doge-db?retryWrites=true&w=majority`);

app.use('/api', routes);

app.listen(config.server.port);


//TODO: create interfaces
//TODO: change Mongo's IP Whitelist to Heroku's IP only
//TODO: 503 -> heroku offline

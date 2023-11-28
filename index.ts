import express, { Application } from 'express';
import dotenv from 'dotenv';
import db from './models/index';
import movieRouter from './routers/MovieRouter';
import cors from 'cors';

//For env File
dotenv.config();

let corsOptions = {
  origin: '*',
};

const app: Application = express();
const port = process.env.PORT || 80;

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ alter: false, force: true }).then(() => {
  console.log('Synced db');
});

app.use('/v1', movieRouter);

app.get('/', (req, res) => {
  res.send('STATUS: OK');
});

app.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

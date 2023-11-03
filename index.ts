import express, { Application } from "express";
import dotenv from "dotenv";
import db from './models/index';
import movieRouter from './routers/MovieRouter'

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log("Synced db");
});

app.use('/', movieRouter);

app.get('/', (req, res) => {
  res.send('STATUS: OK')
})

app.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

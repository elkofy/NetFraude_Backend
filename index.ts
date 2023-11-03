import express, { Application } from "express";
import dotenv from "dotenv";
import db from './models/index';
import movieRouter from './routers/MovieRouter'

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log("Synced db");
});

app.use('/v1', movieRouter);

app.get('/', (req, res) => {
  res.send('STATUS: OK')
})

app.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

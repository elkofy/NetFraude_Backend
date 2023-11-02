import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from 'sequelize';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


interface Movie {
  title: string;
  duration: string;
  genre: string;
  poster: string;
}



let allMedias: any[] = [
  {
    title: "Une pisse",
    duration: "1h30",
    genre: "Figé",
    poster:
      "https://static.wikia.nocookie.net/onepiece/images/a/aa/Volume_77.png",
  },
  {
    title: "Dragon Boule à Z",
    duration: "1h30",
    genre: "Figé",
    poster:
      "https://ih1.redbubble.net/image.1062591670.5646/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg",
  },
  {
    title: "Gunter x Gunter",
    duration: "1h30",
    genre: "Figé",
    poster: "https://fr.web.img5.acsta.net/pictures/19/08/01/09/52/4803203.jpg",
  },
];

const sequelize = new Sequelize({dialect: 'sqlite', storage: "./db-sqlite"});
const Movies = sequelize.define('Movies', {
  title: DataTypes.STRING,
  duration: DataTypes.STRING,
  genre: DataTypes.STRING,
  poster: DataTypes.STRING
});


sequelize.sync({ force: true });

app.get("/movies", async (req: Request, res: Response) => {
  // GET ALL MOVIES
  const allMovies = await Movies.findAll()
  console.log(allMovies)
  
  return res.send(allMovies);
});

app.post("/movies", (req: Request, res: Response) => {
  // ADD MOVIE
  console.log(req.body)
  Movies.create()

  return res.status(200).send("movie creates");
});

app.get("/movies/:id", async (req: Request, res: Response) => {
  // GET ONE MOVIE
  const currentMovie = await Movies.findByPk(req.params.id);

  if (!currentMovie) {
    return res.status(404).send("Not Found");
  }

  return res.send(currentMovie);
});

app.put("/movies/:id", (req: Request, res: Response) => {
  // CHANGE ONE MOVIE
  let objIndex = allMedias.findIndex(
    (obj) => obj.id.toString() === req.params.id
  );

  allMedias[objIndex] = { ...req.body.movie };

  return req.body.movie;
});

app.delete("/movies/:id", (req: Request, res: Response) => {
  // DELETE ONE MOVIE
  Movies.destroy({
    where: {
      id: req.params.id
    }
  });

  return res.status(200).send(`movie ${req.params.id} is deleted`);
});

app.get("/init", (req: Request, res: Response) => {
  Movies.bulkCreate(allMedias);
  res.send("initialized");
});

app.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

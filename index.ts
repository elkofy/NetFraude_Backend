import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from 'sequelize';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

interface Movie {
  id: number;
  title: string;
  duration: string;
  genre: string;
  poster: string;
}

let ALL_MEDIAS: Movie[] = [
  {
    id: 1,
    title: "Une pisse",
    duration: "1h30",
    genre: "Figé",
    poster:
      "https://static.wikia.nocookie.net/onepiece/images/a/aa/Volume_77.png",
  },
  {
    id: 2,
    title: "Dragon Boule à Z",
    duration: "1h30",
    genre: "Figé",
    poster:
      "https://ih1.redbubble.net/image.1062591670.5646/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg",
  },
  {
    id: 3,
    title: "Gunter x Gunter",
    duration: "1h30",
    genre: "Figé",
    poster: "https://fr.web.img5.acsta.net/pictures/19/08/01/09/52/4803203.jpg",
  },
];

app.get("/movies", (req: Request, res: Response) => {
  // GET ALL MOVIES
  return res.send(ALL_MEDIAS);
});

app.post("/movies", (req: Request, res: Response) => {
  // ADD MOVIE
  console.log(req.body.movie);

  ALL_MEDIAS.push(req.body.movie);

  return req.body.movie;
});

app.get("/movies/:id", (req: Request, res: Response) => {
  // GET ONE MOVIE
  const movie = ALL_MEDIAS.filter((res) => res.id.toString() === req.params.id);

  if (!movie.length) {
    return res.status(404).send("Not Found");
  }

  return res.send(movie);
});

app.put("/movies/:id", (req: Request, res: Response) => {
  // CHANGE ONE MOVIE
  let objIndex = ALL_MEDIAS.findIndex(
    (obj) => obj.id.toString() === req.params.id
  );

  ALL_MEDIAS[objIndex] = { ...req.body.movie };

  return req.body.movie;
});

app.delete("/movies/:id", (req: Request, res: Response) => {
  // DELETE ONE MOVIE
  ALL_MEDIAS = ALL_MEDIAS.filter((res) => res.id.toString() !== req.params.id);

  return req.params.id;
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to Express & TypeScript Server");
// });

app.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

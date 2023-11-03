import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json())

const prisma = new PrismaClient()

app.get("/movies", async (req: Request, res: Response) => {
  // GET ALL MOVIES
  const posts = await prisma.movie.findMany()
  return res.json(posts);
});

app.post("/movies", async (req: Request, res: Response) => {
  // ADD MOVIE
  const { title, duration, genre, poster } = req.body
  const movie = await prisma.movie.create({
    data: {
      title: title,
      duration: duration,
      genre: genre,
      poster: poster,
    },
  })

  return res.json(movie);
});

app.get("/movies/:id", async (req: Request, res: Response) => {
  // GET ONE MOVIE
  const { id } = req.params
  const movie = await prisma.movie.findMany({
    where: { id: Number(id) },
  })

  return res.json(movie);
});

app.put("/movies/:id", async (req: Request, res: Response) => {
  // CHANGE ONE MOVIE
  const { id } = req.params
  const { title, duration, genre, poster } = req.body
  const movie = await prisma.movie.update({
    where: { id: Number(id) },
    data: { 
      title: title,
      duration: duration,
      genre: genre,
      poster: poster,
    },
  })

  return res.send(`Movie with id ${id} updated`);
});

app.delete("/movies/:id", async (req: Request, res: Response) => {
  // DELETE ONE MOVIE
  const { id } = req.params
  await prisma.movie.delete({
    where: {
      id: Number(id),
    },
  })

  return res.send(`Movie with id ${id} deleted`);
});

app.listen(port, () => {
  console.log(`🚀 Server is Fire at http://localhost:${port}`);
});

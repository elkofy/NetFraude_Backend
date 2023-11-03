import express from 'express';
import { getAll, getMovieById, createMovie, deleteMovie, updateMovie } from '../controllers/MovieController'


const moviesRouter = express.Router();

moviesRouter.get("/movies", getAll);

moviesRouter.get("/movies/:id", getMovieById);
  
moviesRouter.post("/movies", createMovie);

moviesRouter.delete("/movies/:id", deleteMovie);

moviesRouter.put(("/movies/:id"), updateMovie);

export default moviesRouter
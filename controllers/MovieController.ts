import sequelize from '../models/index';
import db from '../models/index'

export const getAll = async(req: any, res: any) => {
    const allMovie = await db.movie.findAll();
    return res.send(allMovie);
}

export const getMovieById = async(req: any, res: any) => {
    // GET ONE MOVIE
    const currentMovie = await db.movie.findByPk(req.params.id);
  
    if (!currentMovie) {
      return res.status(404).send("Not Found");
    }
    return res.send(currentMovie);
}

export const createMovie = async(req: any, res: any) => {
    console.log(req.body);
    db.Movies.create(req.body);
  
    return res.status(200).send("movie creates");
}

export const deleteMovie = async(req: any, res: any) => {
    db.Movies.destroy({
        where: {
          id: req.params.id
        }
      });
    
    return res.status(200).send(`movie ${req.params.id} is deleted`);
}

export const updateMovie = async(req: any, res: any) => {
    const {title, duration, genre, poster} = req.body;

    await db.movie.update({title: title, duration: duration, genre: genre, poster: poster}, {
        where: {
          id: req.params.id,
        },
    });
    return res.status(200).send(`movie ${req.params.id} was updated`);

}
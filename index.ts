import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const typeDefs = `#graphql
  type Movie {
    id: ID
    title: String
    duration: String
    genre: String
    picture: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(title: String, duration: String, genre: String, picture: String): Movie
    updateMovie(id: ID!, title: String, duration: String, genre: String, picture: String): Movie
    deleteMovie(id: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    musics: async () => {
      return [];
    },
    music: async (parent: any, args: any) => {
      const { id } = args;
      return [];
    },
  },
};

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

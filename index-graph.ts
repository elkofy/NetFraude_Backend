import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import cors from 'cors';

//For env File
dotenv.config();

let corsOptions = {
  origin: '*',
};

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors(corsOptions));

const ALL_MEDIAS = [
  {
    id: 1,
    title: 'Une pisse',
    duration: '1h30',
    genre: 'Figé',
    poster:
      'https://static.wikia.nocookie.net/onepiece/images/a/aa/Volume_77.png',
  },
  {
    id: 2,
    title: 'Dragon Boule à Z',
    duration: '1h30',
    genre: 'Figé',
    poster:
      'https://ih1.redbubble.net/image.1062591670.5646/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg',
  },
  {
    id: 3,
    title: 'Gunter x Gunter',
    duration: '1h30',
    genre: 'Figé',
    poster: 'https://fr.web.img5.acsta.net/pictures/19/08/01/09/52/4803203.jpg',
  },
];

const typeDefs = buildSchema(`
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
`);

const resolvers = {
  movies: async () => {
    return ALL_MEDIAS;
  },
  movie: async (parent: any, args: any) => {
    const { id } = args;
    return [];
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  }),
);

app.listen(port, () => {
  console.log(`🚀 Server is Fire at http://localhost:${port}`);
});

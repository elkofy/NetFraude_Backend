import { Sequelize } from 'sequelize';
import Movie from './Movie';

const sequelize = new Sequelize({dialect: 'sqlite', storage: "./db-sqlite"});

const db: Record<any, any> = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = Movie(sequelize, Sequelize);
export default db;
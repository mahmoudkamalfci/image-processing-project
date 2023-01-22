import express from 'express';
import students from './api/students';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Hello, world! from router ');
});

routes.use('/students', students);

export default routes;

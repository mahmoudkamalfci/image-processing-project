import express from 'express';
import students from './api/students';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Hello, world! fromf router ');
});

routes.use('/images', students);

export default routes;

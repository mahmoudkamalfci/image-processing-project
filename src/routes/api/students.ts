import express from 'express';
import resizeImage from '../../utilities/resizeImage';
const students = express.Router();

students.get('/', resizeImage, () => {
  //
});

export default students;

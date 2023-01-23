import express from 'express';
import resizeImage from '../../utilities/resizeImage';
const images = express.Router();

images.get('/', resizeImage, () => {
  //
});

export default images;

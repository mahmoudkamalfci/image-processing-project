import express from 'express';
import path from 'path';
import fs from 'fs';
import { shrapResizeImage } from './sharpResize';

const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: () => void
): Promise<void> => {

  // get all query parameters from url (req)
  const width = Number(req.query.width) as unknown as number;
  const height = Number(req.query.height) as unknown as number;
  const imageName = req.query.filename as unknown as string;
  const imagePath = path.resolve('./assets/full') as unknown as string;
  const thumbnailPath = path.resolve('./assets/thumb') as unknown as string;
  const resizedImage = thumbnailPath + `/${imageName}-${width}-${height}.jpg` as unknown as string;
  const requestedImage = `${imagePath}/${imageName}.jpg`

  // check image, width and height are in a valid formate
  // check image exist or make resize (cache)
  if(!fs.existsSync(requestedImage)){
    console.error('Invalid input for filename ');
    res.status(400).send('Invalid input for filename ');
  } else if (!imageName) {
    console.error('Image name is required');
    res.status(400).send('Image name is required');
  } else if (isNaN(width) || !width) {
    console.error('Please enter a valid number for width and should be > 0');
    res.status(400).send('Please enter a valid number for width and should be > 0');
  } else if (isNaN(height) || !height) {
    console.error('Please enter a valid number for height and should be > 0');
    res.status(400).send('Please enter a valid number for height and should be > 0');
  }
  // check cached image exist or not
  else if (fs.existsSync(resizedImage)) {
    console.log('this file is already exist use the cached version');
    res.status(200).sendFile(resizedImage);
  } else {
    await shrapResizeImage(imagePath, imageName, width, height, thumbnailPath);
    res.status(200).sendFile(resizedImage);
  }

  next();
};

export default resizeImage;

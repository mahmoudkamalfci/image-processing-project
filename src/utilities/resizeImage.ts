import express from 'express';
import path from 'path';
import fs from 'fs';
import { shrapResizeImage } from './sharpResize';

const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: () => void
): Promise<void> => {
  const width = Number(req.query.width) as unknown as number;
  const height = Number(req.query.height) as unknown as number;
  const imageName = req.query.filename as unknown as string;
  const imagePath = path.resolve('./assets/full') as unknown as string;
  const thumbnailPath = path.resolve('./assets/thumb') as unknown as string;
  const resizedImage = thumbnailPath + `/${imageName}-${width}-${height}.jpg`;

  // check image, width and height are in a valid formate
  // check image exist or make resize (cache)
  if (!imageName) {
    console.log('Image name is required');
    res.send('Image name is required');
  } else if (isNaN(width) || !width) {
    console.log('Please enter a valid number for width and should be > 0');
    res.send('Please enter a valid number for width and should be > 0');
  } else if (isNaN(height) || !height) {
    console.log('Please enter a valid number for height and should be > 0');
    res.send('Please enter a valid number for height and should be > 0');
  }
  // check cached image exist or not
  else if (fs.existsSync(resizedImage)) {
    console.log('this file is already exist use the cached version');
    res.sendFile(resizedImage);
  } else {
    await shrapResizeImage(imagePath, imageName, width, height, thumbnailPath);
    res.sendFile(resizedImage);
  }

  next();
};

export default resizeImage;

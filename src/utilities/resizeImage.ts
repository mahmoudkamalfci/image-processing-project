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
  const width = req.query.width as unknown as string;
  const height = req.query.height as unknown as string;
  const imageName = req.query.filename as unknown as string;
  const imagePath = path.resolve('./assets/full') as unknown as string;
  const thumbnailPath = path.resolve('./assets/thumb') as unknown as string;
  const resizedImage = thumbnailPath + `/${imageName}-${width}-${height}.jpg` as unknown as string;
  const requestedImage = `${imagePath}/${imageName}.jpg`
  let errorMsg = ""

  // check image, width and height are in a valid formate
  // check image exist or make resize (cache)
  if(!imageName){
    console.error('Image name is required');
    res.status(400).send('Image name is required');
  } else if (!fs.existsSync(requestedImage)) {
    console.error('Invalid input for filename ');
    res.status(400).send('Invalid input for filename ');
  } else if (Number(width) <= 0 || width == undefined || isNaN(Number(width))) {

    // validate all width error
     if(width == undefined || width == null) {
      errorMsg = "width value is required"
    }
    else if(isNaN(Number(width))) {
      errorMsg = "width value must be a number"
    } else if(Number(width) <= 0) {
      errorMsg = "width value must be positive number"
    }  else {
      errorMsg = 'Please enter a valid number for width and should be > 0'
    }
    
    console.error(errorMsg);
    res.status(400).send(errorMsg);
  } else if (Number(height) <= 0 || height == undefined || isNaN(Number(height))) {

    // validate all heigth error
    if(height == undefined || height == null) {
      errorMsg = "height value is required" 
    }
    else if(isNaN(Number(height))) {
      errorMsg = "height value must be a number"
    } else if(Number(height) <= 0) {
      errorMsg = "height value must be positive number"
    } else {
      errorMsg = 'Please enter a valid number for height and should be > 0'
    }

    console.error(errorMsg);
    res.status(400).send(errorMsg);
  }
  // check cached image exist or not
  else if (fs.existsSync(resizedImage)) {
    console.log('this file is already exist use the cached version');
    res.status(200).sendFile(resizedImage);
  } else {
    console.log("hreeeeeeeeeeeeeeeeeeee" + height)
    await shrapResizeImage(imagePath, imageName, Number(width), Number(height), thumbnailPath);
    res.status(200).sendFile(resizedImage);
  }

  next();
};

export default resizeImage;

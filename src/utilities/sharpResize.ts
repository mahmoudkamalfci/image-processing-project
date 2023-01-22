import sharp from 'sharp';

export const shrapResizeImage = async (
  imagePath: string,
  imageName: string,
  width: number,
  height: number,
  thumbnailPath: string
): Promise<void> => {
  (await sharp(imagePath + `/${imageName}.jpg`)
    .resize(width, height)
    .toFile(thumbnailPath + `/${imageName}-${width}-${height}.jpg`)) as unknown;
};

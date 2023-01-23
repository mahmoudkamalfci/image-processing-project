import path from 'path';
import fs from 'fs';
import { shrapResizeImage } from '../utilities/sharpResize';
import supertest from 'supertest';
import app from '../index';

describe('check resize done successfully and resized file exists', () => {
  it('check file resized and exist in thumb folder', async () => {
    const imagePath = path.resolve('./assets/full') as unknown as string;
    const thumbnailPath = path.resolve('./assets/thumb') as unknown as string;
    const resizedImage = thumbnailPath + `/encenadaport-100-100.jpg`;

    await shrapResizeImage(imagePath, 'encenadaport', 100, 100, thumbnailPath);

    // check file exist
    expect(fs.existsSync(resizedImage)).toBe(true);
  });
});

// test /api endpoint response status
const request = supertest(app);
describe('Test /api endpoint responses ', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});

// test /api/images endpoint response status
describe('Test /api/images endpoint responses to be 200', () => {
  it('images endpoint successfully return 200 status code ', async () => {
    const response = await request.get(
      '/api/images?filename=santamonica&width=100&height=100'
    );
    expect(response.status).toBe(200);
  });
});

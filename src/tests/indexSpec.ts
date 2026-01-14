import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Image API Endpoint', () => {
  
  it('should return 200 for valid request', async () => {
    const response = await request
      .get('/api/image_1')
      .query({ filename: 'icelandwaterfall.jpg', width: 200, height: 200 });
    
    console.log('Status:', response.status);
    console.log('Body:', response.text);
    
    expect(response.status).toBe(200);
  });
  
});
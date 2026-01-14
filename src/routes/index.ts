import express from 'express';
import image_1 from './api/image_1';
import image_2 from './api/image_2';
const routes = express.Router();



routes.get('/', (req, res) => {
    res.send('main image');
});

routes.use('/image_1', image_1);
routes.use('/image_2', image_2);

export default routes;
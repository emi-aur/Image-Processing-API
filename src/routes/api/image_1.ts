import express from 'express';
const image_1 = express.Router();


image_1.get('/', (req, res) => {
    res.send('image_1');
});

export default image_1;
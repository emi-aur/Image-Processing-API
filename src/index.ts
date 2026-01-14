import express from 'express';
import routes from './routes/index';
const app = express();
const port = 3000;

app.use('/images', routes)
    ;
// start the express server
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});




const myFunc = (num: number): number => {
    return num * num;
};

export default myFunc;

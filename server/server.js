const express = require('express');
const app = express();
const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', router);

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error', 
        status: 500, 
        message: {err: 'An error occurred'}
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(4000, () => {
    console.log('Listening on port 4000')
});

module.exports = app;
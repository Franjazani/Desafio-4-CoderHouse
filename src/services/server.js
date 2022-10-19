const express = require('express');
const mainRouter = require('../routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.json({
        msg: 'ok app'
    })
})

//middleware de errores q hayan en nuestras rutas
app.use((err, res, next) => {
    const status = err.status || 500;
        const message = err.message || 500;

        res.status(status).json({
            message,
        })
    
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

module.exports = app;
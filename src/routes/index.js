const { Router } = require('express');
const productosRouter = require('./productos');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'ok router'
    })
})

router.use('/productos', productosRouter);

module.exports = router;
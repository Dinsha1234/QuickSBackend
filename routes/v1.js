const { Router } = require('express')
const auth = require('../controller/authController/auth')
const foodList = require('../controller/foodController/foodList')

module.exports = () => {
    const router = new Router();
    router.use('/auth', auth);
    router.use('/orders', foodList);
    return router;
  };
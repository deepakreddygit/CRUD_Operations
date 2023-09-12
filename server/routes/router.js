const express = require('express');
const route=express.Router();
const services=require('../services/render')
const controller=require('../controller/controller')

/**
 * @description Root Route
 * @method GET
 */
route.get('/',services.homeRoutes)


/**
 * @description ADD USERS
 * @method GET /add-user
 */
route.get('/add-user', services.add_user);


/**
 * @description UPDATE USERS
 * @method GET /update-user
 */
route.get('/update-user',services.update_user);

//api
route.post('/api',controller.create)
route.get('/api',controller.find)
route.put('/api/:id',controller.update)
route.delete('/api/:id',controller.delete)


module.exports=route;
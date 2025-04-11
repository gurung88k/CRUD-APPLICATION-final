const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
const services = require('../services/render');

//  Root Route - homepage with user list
route.get('/', services.homeRoutes);

//  Add user page
route.get('/add-user', services.add_user);

// Update user page
route.get('/update-user', services.update_user);

// API routes
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);       // return all or one user
route.put('/api/users/:id', controller.update); // update user
route.delete('/api/users/:id', controller.delete); // delete user

module.exports = route;

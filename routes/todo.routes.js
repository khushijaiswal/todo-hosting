const { Read, Create, Delete, Update } = require('../controllers/todo.controller')
const { userProtected } = require('../middleware/auth.middleware')

const todoRouter = require('express').Router()

todoRouter
    .post('/create', userProtected, Create)
    .get('/read', userProtected, Read)
    .delete('/delete/:kuchbhi', userProtected, Delete)
    .put('/update/:kuchbhi', userProtected, Update)

module.exports = todoRouter
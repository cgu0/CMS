// 把routes文件夹所有router文件引入，然后导出

const { Router } = require('express');  
const studentRouter = require('./student.router');
const courseRouter = require('./course.router');
const authRouter = require('./auth.router');
const authGuardMiddleware = require('../middleware/authGuard.middleware');
const adminGuardMiddleware = require('../middleware/adminGuard.middleware');
const v1Router = Router();

v1Router.use('/students', authGuardMiddleware,studentRouter);
v1Router.use('/courses', authGuardMiddleware, courseRouter);
v1Router.use('/auth', authRouter);

module.exports = v1Router;

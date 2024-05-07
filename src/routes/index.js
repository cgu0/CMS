// 把routes文件夹所有router文件引入，然后导出

const { Router } = require('express');  
const studentRouter = require('./student.route');
const courseRouter = require('./course.route');
const v1Router = Router();

v1Router.use('/students', studentRouter);
v1Router.use('/courses', courseRouter);

module.exports = v1Router;

const express = require('express');
const Todo = require('../models/todo.js');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hi');
});

router.post('/todos', async (req, res) => {
    const { value } = req.body;
    const maxOrderByUserId = await Todo.findOne().sort('-order').exec();

    const order = maxOrderByUserId
        ? maxOrderByUserId.order + 1 // maxOrder값 있을 때
        : 1; // 없을 때

    const todo = new Todo({ value, order });
    await todo.save();

    res.send({ message: '등록 성공!' });
});

router.get('/todos', async (req, res) => {
    const todos = await Todo.find().sort('-order').exec();

    res.send({ todos });
});

router.get('/todos', async (req, res) => {
    const todos = await Todo.find().sort('-`order').exec();

    res.send({ todos });
});

router.patch('/todos/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const { order } = req.body;

    // 1. todoId에 해당하는 할 일이 있는가?
    // 1-1. todoId에 해당하는 할 일이 없으면, 에러를 출력
    const currentTodo = await Todo.findById(todoId);
    if (!currentTodo) {
        return res.status(400).json({ errormessage: '존재하지 않는 할 일 입니다.' });
    }

    if (order) {
        const targettodo = await Todo.findOne({ order }).exec();
        if (targettodo) {
            targettodo.order = currentTodo.order;
            await targettodo.save();
        }
        currentTodo.order = order;
        await currentTodo.save();
    }

    res.send();
});

module.exports = router;

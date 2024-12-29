const express = require('express');
const { createTask, editTask, getTaskList } = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/createTask',verifyToken,createTask);
router.post('/editTask',verifyToken,editTask);
router.get('/getTaskList',verifyToken,getTaskList);

module.exports = router;
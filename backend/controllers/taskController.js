const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');
const Task = require('../models/taskSchema');

const createTask = asyncHandler(async(req,res)=>{
    const{name,priority,startTime,endTime,status} = req.body;
    
    const user = await User.findById(req.userId);
    // console.log("in controller");
    console.log(name,priority,startTime,endTime,status);
    
    if(!name || !priority || !startTime || !endTime || !status){
        res.status(404).json({error:'fill all fields'});
        return;
    }
    const task = await Task.create({
        name,
        priority,
        startTime,
        endTime,
        status,
        userId:user,
    })
    if(task){
        res.status(201).json(task);
    }
    else{
        throw new Error('error');
    }
})

const editTask = asyncHandler(async(req,res)=>{
    const{name,priority,startTime,endTime,status,taskId} = req.body;
    // const user = await User.findById(req.userId);
    const task = await Task.findById(taskId);
    if(!task){
        res.status(404).json({error:'task not found'});
        return;
    }
    task.name = name;
    task.priority = priority;
    task.startTime = startTime;
    task.endTime = endTime;
    task.status = status;
    const updatedTask = await task.save();
    if(updatedTask){
        res.status(201).json(updatedTask);
    }
    else{
        throw new Error('error');
    }
})

const getTaskList = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.userId);
    const tasks = await Task.find({userId:user});
    if(tasks){
        res.status(201).json(tasks);
    }
    else{
        throw new Error('error');
    }
})


module.exports = {createTask, editTask, getTaskList};
const Task_db = require('../models/Task');

//response body to be displayed
const response = (ID, NAME, COMPLETED) => {
    return {
        id: ID,
        name: NAME,
        completed: COMPLETED
    }
}

const getAllTask = async (req, res) => {
    try {
        const ALL_TASKS = await Task_db.find();
        res.status(200).json({ tasks: ALL_TASKS });
    } catch (error) {
        res.status(400).json({message:error});
    }
}

const createTask = async (req, res) => {
    //convert request body to preset schema
    try {
        const FIND_ID = await Task_db.create(req.body);
        res.status(201).json(response(FIND_ID.id, FIND_ID.name, FIND_ID.completed));
    } catch (error) {
        res.status(400).json({message:error.errors.name.message});
    }
}

const getSingleTask = async (req, res) => {
    try {
        const FIND_ID = await Task_db.findById(req.params.id);
        if(!FIND_ID) {
           return res.status(404).json({message: `No task found with id: ${FIND_ID}`})
        }
        res.status(200).json(response(FIND_ID.id, FIND_ID.name, FIND_ID.completed));
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const updateTask = async (req, res) => {
    const FIND_ID = await Task_db.findById(req.params.id);
    const UPDATE_TASK = await Task_db.update(FIND_ID)
    res.status(200).json(UPDATE_TASK);
}

const deleteTask = async (req, res) => {
    try {
        const FIND_ID = await Task_db.findByIdAndDelete(req.params.id);
        if(!FIND_ID) {
            return res.status(404).json({message: `No task found with id: ${FIND_ID}`})
         }
        res.status(202).json(response(FIND_ID.id, FIND_ID.name, FIND_ID.completed));
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {
    getAllTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}
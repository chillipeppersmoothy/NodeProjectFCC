const express = require('express');
const { getAllTask, createTask, getSingleTask, updateTask, deleteTask } = require('../controllers/tasks');
const router = express.Router();

router.route('/').get(getAllTask).post(createTask);

router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
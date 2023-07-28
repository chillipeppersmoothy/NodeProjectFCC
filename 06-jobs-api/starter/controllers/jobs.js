const { StatusCodes } = require('http-status-codes');
const Jobs_db = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req,res) => {
    const JOBS = await Jobs_db.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({count:JOBS.length,jobs:JOBS});
}

const getJob = async (req,res) => {
    const {id} = req.params;
    const JOBS = await Jobs_db.findById();
    res.status(StatusCodes.OK).send('get job');
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const JOBS = await Jobs_db.create(req.body);
    res.status(StatusCodes.CREATED).json(JOBS);
} 

const updateJob = async (req,res) => {
    res.status(StatusCodes.CREATED).send('update job');
} 

const deleteJob = async (req,res) => {
    await res.status(StatusCodes.NO_CONTENT).send('delete job');
} 

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
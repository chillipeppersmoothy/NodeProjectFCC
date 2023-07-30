const { StatusCodes } = require('http-status-codes');
const JOBS_DB = require('../models/job');
const { NotFoundError } = require('../../06-jobs-api/starter/errors');
const { BadRequestError } = require('../errors');

const getAllJobs = async (req,res) => {
    const JOBS = await JOBS_DB.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json(JOBS);
}

const getJob = async (req,res) => {
    const {user: {userId}, params: {id: id}} = req;
    const JOB = await JOBS_DB.findOne({_id: id, createdBy: userId});
    if(!JOB) {
        throw new NotFoundError(`The id: ${id} provided doesn't exist`)
    }
    res.status(StatusCodes.OK).json(JOB);
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const JOB = await JOBS_DB.create(req.body);
    res.status(StatusCodes.CREATED).json(JOB);
}

const updateJob = async (req,res) => {
    const {user: {userId},params: {id:id}, body: {company,position} } = req;
    if(company === '' || position === '') {
        throw new BadRequestError('Comapny and position is required.');
    }
    const JOB = await JOBS_DB.findOneAndUpdate({_id: id, createdBy: userId}, req.body, {new: true})
    res.status(StatusCodes.CREATED).json(JOB);
}

const deleteJob = async (req,res) => {
    const {user: {userId}, params: {id: id}} = req;
    const JOB = await JOBS_DB.findOneAndDelete({_id: id, createdBy: userId});
    if(!JOB) {
        throw new NotFoundError(`The id: ${id} provided doesn't exist`)
    }
    res.status(StatusCodes.NOT_FOUND).json(`The object having id: ${id} has been removed`);
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
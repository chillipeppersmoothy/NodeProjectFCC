const { StatusCodes, NOT_FOUND } = require('http-status-codes');
const Jobs_db = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    const JOBS = await Jobs_db.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ count: JOBS.length, jobs: JOBS });
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const JOB = await Jobs_db.findOne({ _id: jobId, createdBy: userId });
    if (!JOB) {
        throw new NotFoundError(`Could not find job with job id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ JOB });
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const JOBS = await Jobs_db.create(req.body);
    res.status(StatusCodes.CREATED).json(JOBS);
}

const updateJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, body: { company, position } } = req;

    if(company === '' || position === '') {
        throw new BadRequestError('Comapny and position is required.')
    }

    const JOB = await Jobs_db.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {new:true})

    if(!JOB) {
        throw new NotFoundError(`Could not find job with id: ${jobId}`);
    }
    res.status(StatusCodes.CREATED).json({ JOB });
}

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const JOB = await Jobs_db.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!JOB) {
        throw new NotFoundError(`Could not find job with job id ${jobId}`);
    }
    res.status(NOT_FOUND).json(`The id: ${jobId} has been removed`);
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
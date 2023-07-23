const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req,res) => {
    res.status(StatusCodes.OK).send('get all jobs');
}

const getJob = async (req,res) => {
    res.status(StatusCodes.OK).send('get job');
}

const createJob = async (req,res) => {
    res.status(StatusCodes.CREATED).send('create job');
} 

const updateJob = async (req,res) => {
    res.status(StatusCodes.CREATED).send('update job');
} 

const deleteJob = async (req,res) => {
    await res.status(StatusCodes.NO_CONTENT).send('delete job');
} 

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
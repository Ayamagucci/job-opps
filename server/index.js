require('dotenv').config();
const { PORT, API_ID, API_KEY } = process.env;
const {/* searchJobs, */ saveJob, getSavedJobs, deleteSavedJob } = require('./controller/actions');
const db = require('../db/index');
// const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(express.json());
// app.use(cors());

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/jobs/save', saveJob);
// app.get('/jobs/search/:userId', searchJobs);
app.get('/jobs/saved/:userId', getSavedJobs);
app.delete('/jobs/saved/:userId/:jobId', deleteSavedJob);

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${ PORT }`);
});
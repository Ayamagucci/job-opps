import React, { useState } from 'react';
import { Box, Paper, Card, CardContent, Typography, Button, Fab } from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Job = ({
  title, company, location, description,
  salary_min, salary_max, redirect_url,
  id, userId, savedJobs, setSavedJobs
}) => {

  const handleSave = async(jobData) => {
    try {
      await axios.post('/jobs/save', { userId, jobData });
      console.dir(jobData);

      const query = await axios.get(`/jobs/saved/${ userId }`);
      setSavedJobs(query.data.savedJobs);

    } catch(err) {
      console.error(`Error saving job: ${ err.message }`);
    }
  };

  const handleDelete = async(jobId) => {
    try {
      await axios.delete(`/jobs/saved/${ userId }/${ jobId }`);

      setSavedJobs((prevSavedJobs) =>
        prevSavedJobs.filter((job) => job.id !== jobId)
      );
      console.log('Job unsaved!');

    } catch(err) {
      console.log(`Error unsaving job: ${ err }`);
    }
  };

  const handleRedirect = () => {
    window.open(redirect_url, '_blank');
  };

  // toggle full description
  const [ showFullDescription, setShowFullDescription ] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  // check if job saved —> conditionally render FAB
  const isJobSaved = savedJobs.some((job) => job.id === id);

  return (
    <Paper elevation={ 3 } sx={{ mb: 2 }}>
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            color="textPrimary"
            sx={{ fontWeight: 'bold' }}
          >
            { title }
          </Typography>

          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="right"
          >
            <LocationOnIcon fontSize="small" /> { location }
          </Typography>

          <Typography variant="subtitle2" color="textSecondary">
            { company }
          </Typography>

          { salary_min && salary_max ? (
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Annual Salary:</strong> ${ salary_min } — ${ salary_max }
            </Typography>
          ) : null }

          <Typography variant="body2" sx={{ mt: 2 }}>
            { (showFullDescription) ? (description) : (`${ description.slice(0, 200) } ...`) }
          </Typography>

          { description.length > 200 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={ toggleDescription }>
                { (showFullDescription) ? ('See Less') : ('See More') }
              </Button>
            </Box>
          ) }

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Box sx={{ ml: '10px' }}>
              { (isJobSaved) ? (
                <Fab
                color="#ab003c"
                size="small"
                onClick={ () => handleDelete(id) }
                >
                  <DeleteOutlineIcon />
                </Fab>
              ) : (
                <Fab
                  color="primary"
                  size="small"
                  onClick={ () => handleSave({
                    title, company, location, description,
                    salary_min, salary_max, redirect_url
                  }) }
                >
                  <SaveAltIcon />
                </Fab>
              ) }
            </Box>

            { redirect_url && (
              <Button onClick={ handleRedirect } startIcon={ <OpenInNewIcon /> }>
                Apply Now
              </Button>
            ) }
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Job;
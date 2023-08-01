import React from 'react';
import { Container, Typography } from '@mui/material';
import Job from './Job';

const JobsList = ({ jobsDisplayed, userId, savedJobs, setSavedJobs }) => (

  <Container maxWidth="md" sx={{ mt: 5 }}>
    { (jobsDisplayed?.length === 0)
      ? (
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="center"
        >
          Sorry, no jobs found.
          But things will get better — keep grinding, friend.
        </Typography>
      ) : (
        jobsDisplayed?.map(({ id, title, company, location, description, salary_min, salary_max, redirect_url }) => (
          <Job key={ id }
            id={ id }
            title={ title }
            // API sends objs —> store as strings
            company={ (typeof company === 'object') ? (company.display_name) : (company) }
            location={ (typeof location === 'object') ? (location.display_name) : (location) }
            description={ description }
            salary_min={ salary_min }
            salary_max={ salary_max }
            redirect_url={ redirect_url }
            userId={ userId }
            savedJobs={ savedJobs }
            setSavedJobs={ setSavedJobs }
          />
        ))
      )
    }
  </Container>
);

export default JobsList;
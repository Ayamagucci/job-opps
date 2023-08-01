import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';

const Switcher = ({ jobsToDisplay, setJobsToDisplay }) => (

  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    mb: '5rem'
  }}>
    <ToggleButtonGroup
      value={ jobsToDisplay }
      onChange={ (e) => setJobsToDisplay(e.target.value) }
      exclusive
    >
      <ToggleButton key="all" value="all">
        All
      </ToggleButton>
      <ToggleButton key="saved" value="saved">
        Saved
      </ToggleButton>
    </ToggleButtonGroup>
  </Box>
);

export default Switcher;
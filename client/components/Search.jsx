import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const Search = ({
  title, setTitle,
  keywords, setKeywords,
  handleSubmit
  // country, setCountry,
  // state, setState,
  // county, setCounty,
  // city, setCity,
}) => (

  <form onSubmit={ handleSubmit }>
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          label="Title"
          placeholder="Space-delimited..."
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
          variant="outlined"
          fullWidth
        />
      </Grid>

      {/* <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          label="Country"
          placeholder='Enter 2-character country code (e.g. "US")...'
          value={ country }
          onChange={ (e) => setCountry(e.target.value) }
          variant="outlined"
          fullWidth
        />
        <TextField
          label="State"
          placeholder='Enter full state name (e.g. "California")...'
          value={ state }
          onChange={ (e) => setState(e.target.value) }
          variant="outlined"
          fullWidth
          disabled={ !country }
        />
        <TextField
          label="County"
          placeholder='Enter full county name (e.g. "Travis County")...'
          value={ county }
          onChange={ (e) => setCounty(e.target.value) }
          variant="outlined"
          fullWidth
          disabled={ !state }
        />
        <TextField
          label="City"
          placeholder='Enter full city name (e.g. "San Francisco")...'
          value={ city }
          onChange={ (e) => setCity(e.target.value) }
          variant="outlined"
          fullWidth
          disabled={ !city }
        />
      </Grid> */}

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          label="Keywords"
          placeholder="Space-delimited..."
          value={ keywords }
          onChange={ (e) => setKeywords(e.target.value) }
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={ 12 }>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Grid>
    </Grid>
  </form>
);

export default Search;
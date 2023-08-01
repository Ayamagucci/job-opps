const { API_URL, API_ID, API_KEY } = process.env;
import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import axios from 'axios';
import Search from './Search';
import JobsList from './JobsList';
import Nav from './Nav';
import CountSetter from './CountSetter';
import Switcher from './Switcher';

const App = () => {

  const [ allJobs, setAllJobs ] = useState([]);
  const [ savedJobs, setSavedJobs ] = useState([]);

  const [ jobsToDisplay, setJobsToDisplay ] = useState('all');
  const [ jobsDisplayed, setJobsDisplayed ] = useState(allJobs);

  const [ count, setCount ] = useState(30);
  const [ page, setPage ] = useState(1);
  const [ startIndex, setStartIndex ] = useState(0);

  // hash marks on slider
  const marks = [ 10, 20, 30, 40, 50 ]
    .map((countIncrem) =>({
      value: countIncrem,
      label: countIncrem.toString()
    }));

  const [ title, setTitle ] = useState('');
  const [ keywords, setKeywords ] = useState('');

  // const [ country, setCountry ] = useState('');
  // const [ state, setState ] = useState('');
  // const [ county, setCounty ] = useState('');
  // const [ city, setCity ] = useState('');

  // SAVED JOBS
  const [ userId, setUserId ] = useState(
    (localStorage.getItem('id') || '')
  );

  useEffect(() => {
    const getUserId = () => {
      let id = localStorage.getItem('id');

      if (!id) {
        id = String(window.crypto.randomUUID());
        localStorage.setItem('id', id);
      }

      return id;
    };

    const cookieId = getUserId();
    setUserId(cookieId);

    const fetchSavedJobs = async() => {
      try {
        const query = await axios.get(`/jobs/saved/${ userId }`);
        setSavedJobs(query.data.savedJobs);

      } catch(err) {
        console.error(`Error fetching saved jobs: ${ err.message }`);
      }
    };

    fetchAllJobs();
    fetchSavedJobs();
    // fetchLocation();

  }, [ count, /* page, */ userId, jobsToDisplay ]);

  const fetchAllJobs = async() => {
    try {
      const queryParams = new URLSearchParams({
        app_id: API_ID,
        app_key: API_KEY,
        results_per_page: count
      });

      const constructWhat = (jobTitle, searchTerms) => {
        let titleParam = '';
        let keywordsParam = '';

        if (jobTitle) {
          titleParam = jobTitle
            .trim().toLowerCase() // standardize
            .split(' ').join('%20'); // convert spaces
        }

        if (searchTerms) {
          // NOTE: space-delimited only
          keywordsParam = searchTerms
            .trim().toLowerCase() // standardize
            .split(' ').join('%20'); // convert spaces
        }

        return (titleParam && keywordsParam)
          ? (`${ titleParam }%20${ keywordsParam }`)
          : (titleParam || keywordsParam);
      };

      const whatParam = constructWhat(title, keywords);
      if (whatParam) {
        queryParams.append('what', whatParam);
      }

      /*
      if (country) {
        queryParams.append('location0', country);

        if (state) {
          queryParams.append('location1', state.split(' ').join('%20'));

          if (county) {
            queryParams.append('location2', county.split(' ').join('%20'));

            if (city) {
              queryParams.append('location3', city.split(' ').join('%20'));
            }
          }
        }
      }
      */

      queryParams.append('content-type', 'application/json');

      const query = await axios({
        method: 'get',
        baseURL: `https://api.adzuna.com/v1/api/jobs/us/search/${ page }`,
        params: queryParams,
      });

      setAllJobs(query.data.results);
      console.dir(query.data.results);

    } catch(err) {
      console.error(`Error fetching all jobs: ${ err }`);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await fetchAllJobs();

    } catch(err) {
      console.error(`Error submitting user input: ${ err }`);
    }
    setTitle('');
    setKeywords('');
  };

  /*
  const handlePageChange = (direction) => {
    setPage((prevPage) => {
      const newPage = (direction === 'next')
        ? (prevPage + 1)
        : (prevPage - 1);

      // update startIndex for pagination
      setStartIndex((newPage - 1) * count);

      return newPage;
    });
  };
  */

  const changeCount = (e) => {
    const newCount = e.target.value;
    setCount(newCount);

    // reset page num to 1 when count changes
    setPage(1);

    // reset startIndex to 0 when count changes
    setStartIndex(0);
  };

  /*
  const fetchLocation = async() => {
    const { geolocation } = navigator;

    if (geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const locationRes = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${ latitude }&longitude=${ longitude }&localityLanguage=en`
        );

        console.dir(locationRes.data);

        const { countryCode, principalSubdivision, city } = locationRes.data;
        const { name } = locationRes.data.localityInfo.administrative[ 3 ];

        setCountry(countryCode);
        setState(principalSubdivision);
        setCounty(name);
        setCity(city);

      } catch (err) {
        console.error(`Error fetching location: ${ err.response.data }`);
      }
    }
  };
  */

  return (
    <Box sx={{ mt: 2 }}>
      <Search
        title={ title }
        setTitle={ setTitle }
        keywords={ keywords }
        setKeywords={ setKeywords }
        handleSubmit={ handleSubmit }
        // country={ country }
        // setCountry={ setCountry }
        // state={ state }
        // setState={ setState }
        // county={ county }
        // setCounty={ setCounty }
        // city={ city }
        // setCity={ setCity }
      />

      {/* <Nav
        page={ page }
        count={ count }
        jobsDisplayed={ jobsDisplayed }
        handlePageChange={ handlePageChange }
      /> */}

      <Switcher
        jobsToDisplay={ jobsToDisplay }
        setJobsToDisplay={ setJobsToDisplay }
      />

      <Typography
        variant="h2"
        component="h1"
        align="center"
        sx={{
          fontFamily: 'Luminari, fantasy',
          fontWeight: 'bold',
          color: '#1e88e5',
          letterSpacing: '2.5px',
          // mt: '1.5rem',
          mb: '4.5rem'
        }}
        gutterBottom
      >
        indubitably
      </Typography>

      <Box sx={{
        display: 'flex',
        margin: 'auto',
        width: '15rem'
      }}>
        <Slider
          getAriaValueText={ (val) => `Count: ${ val }` }
          valueLabelDisplay="auto"
          value={ count }
          onChange={ changeCount }
          step={ 10 }
          min={ 10 }
          max={ 50 }
          marks={ marks }
        />
      </Box>

      <JobsList
        jobsDisplayed={ (jobsToDisplay === 'all') ? (allJobs) : (savedJobs) }
        userId={ userId }
        savedJobs={ savedJobs }
        setSavedJobs={ setSavedJobs }
      />
    </Box>
  );
};

export default App;
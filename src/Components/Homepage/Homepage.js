import React, { useState, useEffect } from 'react';
import './homepage.css';
import worldAPI from '../../services/countryAPI';

function Homepage() {

  const [total, setTotal] = useState('');
  const [deaths, setDeaths] = useState('')
  const [recovered, setRecovered] = useState('');

  useEffect(() => {
    apiAccess();
  }, [])

  // const apiAccess = async () => {
  //   try{
  //     const response = await api.get('/', { headers: {
  //       "x-rapidapi-host": process.env.REACT_APP_API_HOST2,
  //       "x-rapidapi-key": process.env.REACT_APP_API_KEY2   
  //     }});
  //     console.log(response.data)
  //   }catch(err){
  //     console.log('Error while accessing API', err)
  //   }
  // }

  const apiAccess = async () => {
    try{
      const response = await worldAPI.get('/');
      const { confirmed, recovered, deaths } = response.data;
      setTotal(confirmed.value);
      setDeaths(deaths.value);
      setRecovered(recovered.value);
    }catch(err){
      console.log('Error while accessing API Data:', err)
    }
  }

  return (
    <div className="home-container">
      <h1>COVID-19 CoronaVirus Pandemic Update</h1>

      <div>

        <div>
          <h3>TOTAL CASES</h3>
          <div>{total}</div>
        </div>
        
        <div>
          <h3>DEATHS</h3>
          <div>{deaths}</div>
        </div>

        <div>
          <h3>RECOVERED</h3>
          <div>{recovered}</div>
        </div>


      </div>

    </div>
    
  );
}

export default Homepage;

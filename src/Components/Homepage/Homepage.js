import React, { useState, useEffect } from 'react';
import './homepage.css';
import api from '../../services/api';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';

function Homepage() {

  const [total, setTotal] = useState('');
  const [recovered, setRecovered] = useState('');
  const [deaths, setDeaths] = useState('');

  const [countryTotal, setCountryTotal] = useState('');
  const [countryRecovered, setCountryRecovered] = useState('');
  const [countryDeaths, setCountryDeaths] = useState('');

  const [countriesInfo, setCountriesInfo] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const recoveryRate = Math.round(recovered / total * 100) + '%';
  const deathRate = Math.round(deaths / total * 100) + '%';

  const recoveryCountryRate = Math.round(countryRecovered / countryTotal * 100) + '%';
  const deathCountryRate = Math.round(countryDeaths / countryTotal * 100) + '%';

  useEffect(() => {
    apiAccess();
  }, []);

  // useEffect(() => {

  // }, [])

  const handleChange = (e, result) => {
    e.preventDefault();
    const { value } = result || e.target;
    setInputValue(value);
    countrySelectApi(value)
  }

  const countrySelectApi = async (country) => {
    try{
      const response = await axios.get(`https://covid19.mathdro.id/api/countries/${country}`);
      console.log(response.data)
      setCountryTotal(response.data.confirmed.value);
      setCountryRecovered(response.data.recovered.value);
      setCountryDeaths(response.data.deaths.value);
    } catch(err){
      console.log('Error while accessing a specific country', err)
    }
  }


  const getCountries = async () => {
    try{
      const response = await axios.get('https://covid19.mathdro.id/api/countries');
      const { countries } = response.data;
      setCountriesInfo(countries);
      // await countries.map( (e) => ({
      //   ...e,
      //   iso2: e.iso2.toLowerCase()
      // }));
      // console.log(countriesArray)
      // console.log(response.data.countries[0].iso2.toLowerCase())

    } catch(err) {
      console.log('Error while getting countries', err);
    }
  }

  const apiAccess = async () => {
    try{
      const response = await api.get('/');
      const { confirmed, recovered, deaths } = response.data;
      setTotal(confirmed.value);
      setDeaths(deaths.value);
      setRecovered(recovered.value);
      getCountries();
    }catch(err){
      console.log('Error while accessing API Data:', err)
    }
  }


  return (
    <div className="home-container">
      <h1> COVID-19 <span role="img" aria-label="virus">🦠</span></h1> 
      <p>Live Updates</p>

      <h2><span role="img" aria-label="world">🌎</span> Global</h2>

      <div>

        <div>
          <h3><span role="img" aria-label="statistic">📈</span> TOTAL CASES</h3>
          <h4 style={{color: '#f3c623'}}>{parseInt(total).toFixed()
                  .replace(",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
        </div>
        

        <div>
          <h3> <span role="img" aria-label="smiley">😃</span>RECOVERED</h3>
          <h4 style={{color: 'green'}}>{parseInt(recovered).toFixed()
                  .replace(",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          <span style={{backgroundColor: 'green'}}> {recoveryRate} RECOVERY RATE</span>
        </div>

        <div>
          <h3><span role="img" aria-label="crying-face">😢</span>DEATHS</h3>
          <h4 style={{color: '#d63447'}}>{parseInt(deaths).toFixed()
                  .replace(",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          <span style={{backgroundColor: '#d63447'}}> {deathRate} FATALITY RATE</span>

        </div>

      </div>

      
      <Dropdown
    className='hello'
    placeholder='Select Country'
    onChange={handleChange}
    fluid
    search
    selection
    button={true}
    options={countriesInfo.map( (country) => ( {key: country.iso2, value: country.name, text: country.name }))}
  />

      <div>

      <div>
          <h3><span role="img" aria-label="statistic">📈</span> TOTAL CASES</h3>
          <h4 style={{color: '#f3c623'}}>{parseInt(countryTotal).toFixed()
                  .replace(",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
        </div>
        

        <div>
          <h3> <span role="img" aria-label="happy-face">😃</span>RECOVERED</h3>
          <h4 style={{color: 'green'}}>{parseInt(countryRecovered).toFixed()
                  .replace(",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          <span style={{backgroundColor: 'green'}}> {recoveryCountryRate} RECOVERY RATE</span>
        </div>

        <div>
          <h3><span role="img" aria-label="crying-face">😢</span>DEATHS</h3>
          <h4 style={{color: '#d63447'}}>{parseInt(countryDeaths).toFixed()
                  .replace(",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          <span style={{backgroundColor: '#d63447'}}> {deathCountryRate} FATALITY RATE</span>

        </div>

      </div>

    </div>
    
  );
}

export default Homepage;

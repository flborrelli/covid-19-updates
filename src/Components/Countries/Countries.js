import React, { useState } from "react";
import "./countries.css";
import axios from 'axios';
import DropdownBox from '../DropDown/Dropdown';
import Loader from 'react-loader-spinner';


function Countries({ total }) {

  const [countryTotal, setCountryTotal] = useState('');
  const [countryRecovered, setCountryRecovered] = useState('');
  const [countryDeaths, setCountryDeaths] = useState('');
  const [loading, setLoading] = useState(true);

  const recoveryCountryRate =
  Math.round((countryRecovered / countryTotal) * 100) + "%";

const deathCountryRate =
  Math.round((countryDeaths / countryTotal) * 100) + "%";

const totalCountryRate = ((countryTotal / total) * 100).toFixed(3) + "%";

  const countrySelectApi = async (country) => {
    try{
      const response = await axios.get(`https://covid19.mathdro.id/api/countries/${country}`);
      const { data } = response;
      setCountryTotal(data.confirmed.value);
      setCountryRecovered(data.recovered.value);
      setCountryDeaths(data.deaths.value);
      setLoading(false);
    } catch(err){
      console.log('Error while accessing a specific country', err)
    }
  }

  return (
    <div className="country-container">
      <h2>
        <span role="img" aria-label="world">
          🌎
        </span>{" "}
        By Country
      </h2>
      <DropdownBox countrySelectApi={countrySelectApi}/>
      <div>
        <div>
          <h3>
            <span role="img" aria-label="statistic">
              📈
            </span>{" "}
            TOTAL CASES
          </h3>
          <h4 style={{ color: "#f3c623" }}>
            {
              (loading) ? <Loader type="ThreeDots"
         color="#00BFFF"
         height={100}
         width={100}
         /> :
              (countryTotal) ? parseInt(countryTotal)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
            }
            
          </h4>
          <span style={{ backgroundColor: "#f3c623" }}>
            {" "}
            {totalCountryRate} OF GLOBAL RATE
          </span>
        </div>

        <div>
          <h3>
            {" "}
            <span role="img" aria-label="happy-face">
              😃
            </span>
            RECOVERED
          </h3>
          <h4 style={{ color: "green" }}>
            { 
              (loading) ? <Loader type="ThreeDots"
         color="#00BFFF"
         height={100}
         width={100}
         /> :
              (countryTotal) ?
              parseInt(countryRecovered)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
              }
          </h4>
          <span style={{ backgroundColor: "green" }}>
            {" "}
            {(loading) ? '0%' : recoveryCountryRate} RECOVERY RATE
          </span>
        </div>

        <div>
          <h3>
            <span role="img" aria-label="crying-face">
              😢
            </span>
            DEATHS
          </h3>
          <h4 style={{ color: "#d63447" }}>
            { 
              (loading) ? <Loader type="ThreeDots"
         color="#00BFFF"
         height={100}
         width={100}
         /> :
              (countryTotal) ?
            parseInt(countryDeaths)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
              0
              }
          </h4>
          <span style={{ backgroundColor: "#d63447" }}>
            {" "}
            {
              (loading) ? '0%' : deathCountryRate
              } FATALITY RATE
          </span>
        </div>
      </div>
    </div>
  );
}

export default Countries;

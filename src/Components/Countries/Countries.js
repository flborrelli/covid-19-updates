import React, { useState } from "react";
import "./countries.css";
import axios from 'axios';
import DropdownBox from '../DropDown/Dropdown';

function Countries({ total }) {

  const [countryTotal, setCountryTotal] = useState('');
  const [countryRecovered, setCountryRecovered] = useState('');
  const [countryDeaths, setCountryDeaths] = useState('');

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
            {parseInt(countryTotal)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            {parseInt(countryRecovered)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h4>
          <span style={{ backgroundColor: "green" }}>
            {" "}
            {recoveryCountryRate} RECOVERY RATE
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
            {parseInt(countryDeaths)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h4>
          <span style={{ backgroundColor: "#d63447" }}>
            {" "}
            {deathCountryRate} FATALITY RATE
          </span>
        </div>
      </div>
    </div>
  );
}

export default Countries;

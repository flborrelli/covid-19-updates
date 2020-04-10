import React, { useState, useEffect } from "react";
import "./homepage.css";
import Countries from '../Countries/Countries';
import World from "../World/World";
import api from "../../services/api";
import Loader from 'react-loader-spinner';
import Footer from '../Footer/Footer'

function Homepage() {

  const [total, setTotal] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiAccess();
  }, []);

  const apiAccess = async () => {
    try {
      const response = await api.get("/");
      const { confirmed, recovered, deaths } = response.data;
      setTotal(confirmed.value);
      setDeaths(deaths.value);
      setRecovered(recovered.value);
      setLoading(false)
    } catch (err) {
      console.log("Error while accessing API Data:", err);
    }
  };

  return (
    <>
    {
      (loading) ?
      <div className="loader">
      <Loader
      type="Grid"
       color="#032444"
       height={300}
       width={300}
       
      /> 
      </div> 
      : 
      <>
      <div className="home-container">
      <div>
    <img src="/android-chrome-192x192.png" alt="virus"/>
    <h1>
      COVID-19
      <p>Live Updates</p>
    </h1>
    <span role="img" aria-label="virus" className='virus'>
        🦠
      </span>
      </div>
  </div>
    <World total={total} recovered={recovered} deaths={deaths} />
    <Countries total={total} />
    <Footer/>
    </>
    } 
    </> 
  );
}

export default Homepage;

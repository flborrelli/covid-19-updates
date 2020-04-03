import React, { useState, useEffect } from "react";
import "./homepage.css";
import Countries from '../Countries/Countries';
import World from "../World/World";
import api from "../../services/api";

function Homepage() {

  const [total, setTotal] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");

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
    } catch (err) {
      console.log("Error while accessing API Data:", err);
    }
  };

  return (
    <>
    <div className="home-container">
      <h1>
        {" "}
        COVID-19{" "}
        <span role="img" aria-label="virus">
          🦠
        </span>
      </h1>
      <p>Live Updates</p>
    </div>
      <World total={total} recovered={recovered} deaths={deaths} />
      <Countries total={total} />
  </>    
  );
}

export default Homepage;

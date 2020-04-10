import React from "react";
import "./world.css";


function World({ total, recovered, deaths }) {

  const recoveryRate = Math.round(recovered / total * 100) + '%';
  const deathRate = Math.round(deaths / total * 100) + '%';

  return (
    <div className="world-container">
      <h2>
        <span role="img" aria-label="world">
          🌎
        </span>{" "}
        Global
      </h2>

      <div>
        <div>
          <h3>
            <span role="img" aria-label="statistic">
              📈
            </span>{" "}
            TOTAL CASES
          </h3>
          <h4 style={{ color: "#f3c623" }}>
            {parseInt(total)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h4>
        </div>

        <div>
          <h3>
            {" "}
            <span role="img" aria-label="smiley">
              😃
            </span>
            RECOVERED
          </h3>
          <h4 style={{ color: "#89ca5b" }}>
            {parseInt(recovered)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h4>
          <span style={{ backgroundColor: "#89ca5b" }}>
            {" "}
            {recoveryRate} RECOVERY RATE
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
            {parseInt(deaths)
              .toFixed()
              .replace(",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h4>
          <span style={{ backgroundColor: "#d63447" }}>
            {" "}
            {deathRate} FATALITY RATE
          </span>
        </div>
      </div>
    </div>
  );
}

export default World;

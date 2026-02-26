import React from "react";
import Button from "./button";
const Main = () => {
  return (
    <div className="container">
      <div className="p-5 text-center bg-light-dark rounded">
        <h1 className="text-light">
          Stock Prediction Portal
        </h1>

        <p className="text-light lead">
          This stock prediction application utilizes machine learning
          techniques such as LSTM models to forecast future stock
          prices using 100-day and 200-day moving averages.
        </p>

        <Button text="Login" class="btn-outline-warning" />
      </div>
    </div>
  );
};

export default Main;
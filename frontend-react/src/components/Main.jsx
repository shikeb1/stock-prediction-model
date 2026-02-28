import React from "react"
import { Link } from 'react-router-dom'
import Button from "./button"
import Header from './Header'
import Footer from './Footer'






const Main = () => {
  return (
    <>
    
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

        <div className="d-flex gap-3 justify-content-center">
          <Link to="/login" className="btn btn-outline-warning">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </div>
    
    </>
  );
};

// export default Main;
export default Main;
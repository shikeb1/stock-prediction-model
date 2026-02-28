import React from "react";
import Button from "./button";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar container pt-3 pb-3" align-items-start="true">
      <Link className="navbar-brand text-light" to="/">
        Stock Prediction Portal
      </Link>

      <div>
       <Button text="Login" class="btn-outline-warning  me-2" url="/login" />
        &nbsp;
        <Button text="Register" class="btn-info text-dark fw-semibold" url="/register" />

        
        
      </div>
    </nav>
  );
};

export default Header;
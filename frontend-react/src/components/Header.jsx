import React from "react";
import Button from "./button";

const Header = () => {
  return (
    <nav className="navbar container pt-3 pb-3" align-items-start>
      <a className="navbar-brand text-light" href="#">
        Stock Prediction Portal
      </a>

      <div>
       <Button text="Login" class="btn-outline-warning  me-2" />
        &nbsp;
        <Button text="Sign Up" class="btn-info text-dark fw-semibold" />

        
        
      </div>
    </nav>
  );
};

export default Header;
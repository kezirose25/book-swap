import React from "react";
import BrokenPage from "../assets/404.png";
import {Link} from "react-router-dom";
import './Error.css';

export default function Error404View(props) {
  
  return (
    <div className="container mx-auto">
      <div className="d-flex flex-column align-items-center mx-auto">
        <div id="error-image">
          <img src={BrokenPage} className="img-fluid" alt="404image" width="500px" loading="lazy" />
        </div>
      <div>
        <h1 className="display-5 fw-bold lh-1 mb-3">Uh oh!</h1>
        <p className="lead">Something went wrong.</p>
      <div className="d-grid gap-2 d-md-flex justify-content-center">
        <Link className="btn btn-primary btn-lg px-4 me-md-2" to="/">Go Home</Link>
      </div>
  </div>
</div>
</div>
  );
}
import React from "react";
import BrokenPage from "../assets/404.png";
import {Link} from "react-router-dom";
import './Error.css';

export default function Error404View(props) {
  
  return (
    <div className="container mx-auto">
    <div className="row flex-row-reverse align-items-center justify-content-center mx-auto">
      <div id="error-image" className="col-10 col-sm-8 col-lg-6">
        <img src={BrokenPage} className="mx-auto img-fluid" alt="404image" loading="lazy" />
      </div>
    <div className="col-lg-6">
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
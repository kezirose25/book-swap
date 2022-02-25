import React from "react";
import BookImage from "../assets/Books.png";

export default function HomeView(props) {
  
  return (

  <div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src={BookImage} className="mx-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
      </div>
    <div className="col-lg-6">
      <h1 className="display-5 fw-bold lh-1 mb-3">Welcome to BkSwppr!</h1>
    <p className="lead">Swap books with other book-lovers in your local area. An easy way to exchange your old books for new ones, with hundreds of books to choose from! Find your new favourite book today.</p>
    <div className="d-grid gap-2 d-md-flex justify-content-center">
      <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Browse Books</button>
    </div>
  </div>
</div>
</div>
  );
}
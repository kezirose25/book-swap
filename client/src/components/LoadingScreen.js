import React from "react";
import './LoadingScreen.js';

export default function LoadingScreen(props) {
  
  return (
    <div id="highlighted-book" className="px-5 py-5 rounded-3">

        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>

    </div>

  );
}
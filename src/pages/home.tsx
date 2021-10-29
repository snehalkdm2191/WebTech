import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";

export default function home() {
  return (
    <div className="Home-page">
      <div className="hero" id="hero">
        <VideoPlayer/>

        <div className="bloc">
          <Link className="btn btn-light btn-signup" to="/login">
            <h3>signup</h3>
          </Link>
          <Link className="btn btn-light btn-home-login" to="/login">
            <h3>login</h3>
          </Link>
        </div>
      </div>
      <HomeContent/>
      <Footer/>
    </div>
  );
}

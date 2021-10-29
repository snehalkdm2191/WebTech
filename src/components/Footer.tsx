import React from "react";
import imglinkedin from "../assets/img/linkedin.png";
import imgFB from "../assets/img/facebook.png";
import imgTwitter from "../assets/img/twitter.png";

export default function Footer() {
  return (
    <div id="Footer">
      <p>
        <a
          className="footer-links"
          href="https://www.linkedin.com/in/snehal-kadam-alsundkar-45601016b/"
        >
          <img src={imglinkedin} alt="contact linkedin" />
        </a>
        <a className="footer-links" href="https://github.com/snehalkdm2191/">
          <img src={imgFB} alt="contact linkedin" />
        </a>
        <a className="footer-links" href="https://gitlab.com/snehalkdm2191">
          <img src={imgTwitter} alt="contact linkedin" />
        </a>
        <br />
        <span className="copyright-text">© 2021 • Snehal Kadam</span>
      </p>
    </div>
  );
}

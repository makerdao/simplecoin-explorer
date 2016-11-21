import React from 'react';

const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social"><a href="#"><i className="icon ion-social-github"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>
        <ul className="list-inline">
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
        <p className="copyright">MakerDAO © 2016</p>
      </footer>
    </div>
  )
}

export default Footer;

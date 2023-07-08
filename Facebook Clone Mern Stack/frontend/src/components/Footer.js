import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p>Made With <i className='fa fa-heart' /> By AMIR SHAHZAD HASHMI</p>
            <div className="social-icons">
              <a href="https://github.com/syedamirshah7145" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon  className="text-light mr-3" />
                <i className='fa fa-github fa-3x' />
              </a>
              <a href="https://www.facebook.com/syedamirshah7145" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon  className="text-light mr-3" />
                <i className='fa fa-facebook fa-3x' />
              </a>
              <a href="https://twitter.com/amirhashmi7145" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="text-light fa fa-twitter" />
                <i className='fa fa-twitter fa-3x' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

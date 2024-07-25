import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return(
        <footer>
            <div className="footer-icons">
            <div className="f-icons">
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className="social-icons"/>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="social-icons"/>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} className="social-icons"/>
                </a>
                </div>
                <p>cotact1234@example.com</p>
            </div>
            <div className="footer-second">
                <p>Copyright &copy; 2024 Designed By Good Guys</p>
            </div>
        </footer>
    );
}

export default Footer;
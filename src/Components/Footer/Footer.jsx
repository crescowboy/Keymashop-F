import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOOPER</p>
        </div>
        <div className='footer-links'>
            <Link to={"/"}>Shop</Link>
            <Link to={"/womens"}>Womens</Link>
            <Link to={"/mens"}>Mens</Link>
            <Link to={"/kids"}>Kids</Link>
            <Link to={"/"}>Contact</Link>
        </div>
        <div className="footer-social-icon">
            <a href="https://www.linkedin.com/in/wellington-crespo-64262a24b/">
                <div className="footer-icons-container">
                <FontAwesomeIcon icon={faInstagram} className='icon'/>
                </div>
            </a>
            
            <a href="https://www.linkedin.com/in/wellington-crespo-64262a24b/">
                <div className="footer-icons-container">
                <FontAwesomeIcon icon={faTiktok} className='icon'/>
                </div>
            </a>
            
            <a href="https://www.linkedin.com/in/wellington-crespo-64262a24b/">
                <div className="footer-icons-container">
                <FontAwesomeIcon icon={faWhatsapp} className='icon'/>
                </div>
            </a>
            
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyrigth @ 2024 - All Right Reserved</p>
        </div>
        </div>
  )
}

export default Footer
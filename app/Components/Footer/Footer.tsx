import '../Footer/Footer.css';
import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { BiLogoMediumOld } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { ImFacebook } from 'react-icons/im';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="secCotainer container grid">
        <div data-aos="fade-up" data-aos-duration="2000" className="logoDiv">
          <div className="footerLogo">
            <BiLogoMediumOld className="icon" />
            <span>Hello</span>
          </div>

          <div className="socials flex">
            <ImFacebook className="icon" />
            <BsTwitter className="icon" />
            <AiFillInstagram className="icon" />
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="2500"
          className="footerLinks"
        >
          <span className="linkTitle">Information</span>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/">Explore</a>
            </li>
            <li>
              <a href="/">Travel</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
          </ul>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="footerLinks"
        >
          <span className="linkTitle">Helpful Links</span>
          <ul>
            <li>
              <a href="/">FAQs</a>
            </li>
            <li>
              <a href="/">Support</a>
            </li>
            <li>
              <a href="/">Terms and Conditions</a>
            </li>
            <li>
              <a href="/">Privacy</a>
            </li>
          </ul>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="3500"
          className="footerLinks"
        >
          <span className="linkTitle">Contact</span>
          <span className="phone">+43 123 4567</span>
          <span className="email">hello@hello.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

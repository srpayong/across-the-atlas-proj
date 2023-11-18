// ScrollButton.js
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-scroll';

const ScrollButton = () => {
  return (
    <Link
      to="mainContent" // Replace with the ID of the section you want to scroll to
      spy={true}
      smooth={true}
      offset={-70} // Adjust offset as needed
      duration={500}
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full cursor-pointer"
    >
      <IoIosArrowDown size={40} />
    </Link>
  );
};

export default ScrollButton;

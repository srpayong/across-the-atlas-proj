'use client';
import '../Questions/Questions.css';
import 'aos/dist/aos.css';
import Aos from 'aos';
import React, { useEffect } from 'react';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';

const Accordion = ({ title, desc, active, setActive }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="accordionContainer" data-aos="fade-up">
      <span
        className={(active === title ? 'titleAc' : '') + ' title ' + ' flex'}
      >
        {title}
        <button
          className={(active === title ? 'titleAc' : '') + ' title ' + ' flex'}
          onClick={() => setActive(title)}
        >
          {title}
          <span>
            {active === title ? (
              <BsArrowDownCircle className="icon" />
            ) : (
              <BsArrowUpCircle className="icon" />
            )}
          </span>
        </button>
      </span>
      <p className={(active === title ? 'show' : '') + ' description'}>
        {desc}
      </p>
    </div>
  );
};

export default Accordion;

import React from 'react';

const CheckIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={{ display: 'block', margin: '0 auto' }}
  >
    
   {/*  <circle cx="12" cy="12" r="10" fill="none" stroke="#1E90FF" strokeWidth="2" /> */}
    
    {/* <path
      d="M8 12.5l2.5 3L16 9"
      stroke="#28A745"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    <path
      d="M16 9l1 1.5"
      stroke="#28A745"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    /> */}

    <path
      d="M6 12l4 4L18 6"
      stroke="#28A745"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
); 

export default CheckIcon;
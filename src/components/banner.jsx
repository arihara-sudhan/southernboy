import React from 'react';
import arimg from '../static/ari.jpg';
import '../static/banner.css';

const Banner = () => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className="banner">
      <img
        src={arimg}
        alt="profile-pic"
        id="arimg"
        onContextMenu={handleContextMenu}
      />
      <div className="arinames">
        <span id="ariname">The Southern Boy ☘️</span>
        <span id="bio">ARAVIND ARIHARASUDHAN</span>
      </div>
    </div>
  );
};

export default Banner;

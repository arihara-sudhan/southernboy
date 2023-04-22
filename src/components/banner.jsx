import React from 'react'
import arimg from '../static/ari.jpg'
import '../static/banner.css'

export default function Banner(){
    return(
        <div className="banner">
            <img src={arimg} alt="profile-pic" id="arimg"></img>
            <div className='arinames'>
                <span id="ariname">The Southern Boy ☘️</span>
                <span id='bio'>ARAVIND ARIHARASUDHAN</span>
            </div>
        </div>
    
    );
}
// Splash.js
import React from 'react';
import Lottie from 'lottie-react';
// import animationData from '../src/logoAnim.json';

const Splash = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1E1E1E', // Set the background color to match your dark theme
      }}
    >
      <Lottie
        // animationData={animationData}
        loop={false} // Set to true if you want the animation to loop
        autoplay={true} // Set to true if you want the animation to play automatically
      />
    </div>
  );
};

export default Splash;


import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import * as LucideIcons from 'lucide-react';
import Ananya from '../assets/ananya.jpg';
import './new.css';

const Balloon = ({ color, delay, left }) => (
  <div
    className="balloon"
    style={{
      animationDelay: `${delay}s`,
      left: `${left}%`,
    }}
  >
    <svg viewBox="0 0 50 60" className="w-full h-full">
      <path
        d="M25 0 C 10 10, 0 30, 0 40 C 0 55, 15 60, 25 60 C 35 60, 50 55, 50 40 C 50 30, 40 10, 25 0"
        fill={color}
      />
    </svg>
    <div className="balloon-string" style={{ backgroundColor: color }}></div>
  </div>
);

const Candle = ({ left, delay }) => (
  <div className="candle" style={{ left: `${left}%`, animationDelay: `${delay}s` }}>
    <div className="candle-body"></div>
    <div className="candle-flame"></div>
  </div>
);

const BirthdayConfetti = () => {
  const [isConfettiVisible, setConfettiVisible] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const { width, height } = useWindowSize();

  const handleButtonClick = () => {
    setConfettiVisible(true);
    setShowWishes(true);
    setTimeout(() => setConfettiVisible(false), 10000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWishes(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, [showWishes]);

  return (
    <div className="birthday-container">
      <div className="overlay"></div>

      <img
        src={Ananya}
        alt="Ananya"
        className="background-image"
      />
      
      <div className="content">
        <h1 className="birthday-text">
          🎉 Happy Birthday, Ananya! 🎉
        </h1>
        
        <div className="cake">
          <LucideIcons.Cake 
            size={150} 
            color="#FFD700" 
            className="cake-icon" 
          />
          <Candle left={20} delay={0} />
          <Candle left={50} delay={0.5} />
          <Candle left={80} delay={1} />
        </div>
        
        <button
          onClick={handleButtonClick}
          className="celebrate-button"
        >
          Celebrate 🎉
        </button>
        
        {showWishes && (
          <div className="wishes">
            <p>Wishing you a day filled with joy and laughter!</p>
            <p>May all your dreams come true. 🌟</p>
          </div>
        )}
      </div>
      
      {isConfettiVisible && (
        <>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
          />
          <div className="balloons">
            {[...Array(15)].map((_, index) => (
              <Balloon
                key={index}
                color={`hsl(${Math.random() * 360}, 80%, 60%)`}
                delay={Math.random() * 2}
                left={Math.random() * 100}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BirthdayConfetti;

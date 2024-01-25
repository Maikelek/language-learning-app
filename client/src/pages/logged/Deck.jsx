import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const Deck = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-container">
          <Card />
        </div>
      </div>
    </>
  );
};

export default Deck;

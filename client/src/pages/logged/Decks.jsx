import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import flag from "../../data/flags/flag_de.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faTrash, faEdit, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

const Decks = () => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleUnhover = () => {
    setHovered(false);
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="deck"
             onMouseEnter={handleHover}
             onMouseLeave={handleUnhover}>
          <div className="flag-holder">
            <img src={flag} alt="flag" />
          </div>
          <h3>German</h3>

          {hovered && (
            <div className='hovered-deck'>
              
              <div className="hovered-deck-center">
                <button className='revise-button'>Revise <FontAwesomeIcon icon={faPuzzlePiece}/></button>
                <button className='edit-button'>Edit <FontAwesomeIcon icon={faEdit}/></button>
                <button className='remove-button'>Remove <FontAwesomeIcon icon={faTrash}/></button>
              </div>

            </div>
          )}
        </div>

        <div className='plus'>
            <FontAwesomeIcon icon={faCirclePlus} style={{cursor: "pointer"}}/>
        </div>

      </div>
    </>
  )
}

export default Decks;

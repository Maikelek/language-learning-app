import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import flag from "../../data/flags/flag_de.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faTrash, faEdit, faPuzzlePiece, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Decks = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [newDeck, setNewDeck] = useState({
    deck_name: '',
    deck_flag: '',
  });

  const handleChange = (e) => {
    setNewDeck((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    setClicked(true);
  };

  const handleUnclick = () => {
    setClicked(false);
  };

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

       

        <div className='plus' onClick={handleClick}>
            <FontAwesomeIcon icon={faCirclePlus} style={{cursor: "pointer"}}/>
        </div>

      </div>

      {clicked && (
          <div className="add-deck">
            <FontAwesomeIcon onClick={handleUnclick} icon={faCircleXmark} className='add-deck-ender'/>
            
            <form className='add-deck-form'>

              <h3 style={{fontSize: "28px", marginBottom: "1.5rem", textAlign: "center"}}>Create a new deck</h3>

                <div className="label-input">
                  <label htmlFor="deck_name" className="label-classic">Name of the deck</label>
                  <input 
                    type="text" 
                    id="deck_name" 
                    name="deck_name" 
                    placeholder='Insert deck name' 
                    onChange={handleChange} 
                    className="add-deck-input"
                    />
                </div>

                <div className="label-input">
                  <label htmlFor="deck_flag" className="label-classic">Flag</label>
                  <select name="deck_flag" id="deck_flag" className="add-deck-select">
                    <option value="0">Choose your option</option>
                    <option value="flag_de">German</option>
                  </select>
                  <button className='add-deck-button'>Create</button>
                </div>

            </form>

          </div>
        )}

    </>
  )
}

export default Decks;

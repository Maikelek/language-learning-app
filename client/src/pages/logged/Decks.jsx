import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

import useAuth from '../hooks/useAuth';
import config from '../../config/Config';
import flag_de from "../../data/flags/flag_de.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrash, faEdit, faPuzzlePiece, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Decks = () => {
  const { userId } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [newDeck, setNewDeck] = useState({
    deck_name: '',
    deck_flag: "0",
  });
  const [errors, setErrors] = useState({
    deck_name: '',
    deck_flag: '',
  });
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }
  
      try {
        const response = await axios.get(`${config.apiUrl}/deck/${userId}`, {
          withCredentials: true
        });
        setDecks(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching decks:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userId]);
  

  const handleChange = (e) => {
    setNewDeck((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleUnhover = () => {
    setHovered(false);
  };

  const handleCreateDeck = async () => {
    let validationErrors = {};
    if (newDeck.deck_name.trim() === '') {
      validationErrors.deck_name = 'Please enter a deck name.';
    }
    if (newDeck.deck_flag === "0") {
      validationErrors.deck_flag = 'Please choose a flag.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const deckWithUserId = { ...newDeck, id: userId };
      const response = await axios.post(`${config.apiUrl}/deck`, deckWithUserId, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data.message) {
        setErrors((prev) => ({ ...prev, deck_name: response.data.message }));
        return;
      }

      window.location.reload();

    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container">
          {Array.isArray(decks) ? (
            decks.map((deck) => (
              <div key={deck.deck_id} className="deck"
                onMouseEnter={handleHover}
                onMouseLeave={handleUnhover}>
                <div className="flag-holder">
                  <img src={flag_de} alt="flag" />
                </div>
                <h3>{deck.deck_name}</h3>
                {hovered && (
                  <div className='hovered-deck'>
                    <div className="hovered-deck-center">
                      <button className='revise-button'>Revise <FontAwesomeIcon icon={faPuzzlePiece} /></button>
                      <button className='edit-button'>Edit <FontAwesomeIcon icon={faEdit} /></button>
                      <button className='remove-button'>Remove <FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Decks data is not in the expected format.</p>
          )}

          <div className='plus' onClick={handleClick}>
            <FontAwesomeIcon icon={faCirclePlus} style={{ cursor: "pointer", marginRight: "1rem" }} />
          </div>
        </div>
      )}

        {clicked && (
          <div className="add-deck">
            <FontAwesomeIcon onClick={handleClick} icon={faCircleXmark} className='add-deck-ender'/>
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
                    value={newDeck.deck_name}
                    className="add-deck-input"
                  />
                  {errors.deck_name && <p className="label-error-deck">{errors.deck_name}</p>}
                </div>
                <div className="label-input">
                  <label htmlFor="deck_flag" className="label-classic">Flag</label>
                  <select
                    name="deck_flag"
                    id="deck_flag"
                    className="add-deck-select"
                    onChange={handleChange}
                    value={newDeck.deck_flag}
                  >
                    <option value="0">Choose your option</option>
                    <option value="flag_de">German</option>
                  </select>
                  {errors.deck_flag && <p className="label-error-deck">{errors.deck_flag}</p>}
                  <button className='add-deck-button' type="button" onClick={handleCreateDeck}>
                    Create
                  </button>
                </div>
            </form>
          </div>
        )}
    </>
  )
}


export default Decks;

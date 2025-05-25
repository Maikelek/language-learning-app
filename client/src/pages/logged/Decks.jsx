import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

import config from '../../config/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrash, faEdit, faPuzzlePiece, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import flag_de from '../../data/flags/flag_de.png';
import flag_fr from '../../data/flags/flag_fr.png';
import flag_ru from '../../data/flags/flag_ru.png';
import flag_es from '../../data/flags/flag_es.png';

import { useUser } from '../hooks/AuthProvider';

const flagImages = {
  flag_de: flag_de,
  flag_fr: flag_fr,
  flag_ru: flag_ru,
  flag_es: flag_es,
};

const Decks = () => {
  const { user, loading: userLoading } = useUser();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [newDeck, setNewDeck] = useState({ deck_name: '', deck_flag: '0' });
  const [errors, setErrors] = useState({ deck_name: '', deck_flag: '' });
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`${config.apiUrl}/deck/${user.id}`, {
          withCredentials: true,
        });
        setDecks(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      } catch (error) {
        console.error('Error fetching decks:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setNewDeck((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleClick = () => setClicked(!clicked);
  const handleHover = () => setHovered(true);
  const handleUnhover = () => setHovered(false);

  const handleDeleteDeck = async (deckId) => {
    try {
      await axios.delete(`${config.apiUrl}/deck/${deckId}`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  const handleCreateDeck = async () => {
    let validationErrors = {};
    if (newDeck.deck_name.trim() === '') {
      validationErrors.deck_name = 'Please enter a deck name.';
    }
    if (newDeck.deck_flag === '0') {
      validationErrors.deck_flag = 'Please choose a flag.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const deckWithUserId = { ...newDeck, id: user.id };
      const response = await axios.post(`${config.apiUrl}/deck`, deckWithUserId, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
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

  if (userLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        {Array.isArray(decks) && decks.length > 0 ? (
          decks.map((deck) => (
            <div
              key={deck.deck_id}
              className="deck"
              onMouseEnter={handleHover}
              onMouseLeave={handleUnhover}
            >
              <div className="flag-holder">
                <img src={flagImages[deck.deck_flag]} alt="flag" />
              </div>
              <h3>{deck.deck_name}</h3>
              {hovered && (
                <div className="hovered-deck">
                  <div className="hovered-deck-center">
                    <Link to={`/deck/${deck.deck_id}`}>
                      <button className="revise-button">
                        Revise <FontAwesomeIcon icon={faPuzzlePiece} />
                      </button>
                    </Link>
                    <Link to={`/deck/edit/${deck.deck_id}`}>
                      <button className="edit-button">
                        Edit <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </Link>
                    <button
                      className="remove-button"
                      onClick={() => handleDeleteDeck(deck.deck_id)}
                    >
                      Remove <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="deck" style={{ cursor: 'default' }}>
            You don't have any decks
          </p>
        )}
        <div className="plus" onClick={handleClick}>
          <FontAwesomeIcon icon={faCirclePlus} style={{ cursor: 'pointer', marginRight: '1rem' }} />
        </div>
      </div>

      {clicked && (
        <div className="add-deck">
          <FontAwesomeIcon onClick={handleClick} icon={faCircleXmark} className="add-deck-ender" />
          <form className="add-deck-form">
            <h3 style={{ fontSize: '28px', marginBottom: '1.5rem', textAlign: 'center' }}>
              Create a new deck
            </h3>
            <div className="label-input">
              <label htmlFor="deck_name" className="label-classic">
                Name of the deck
              </label>
              <input
                type="text"
                id="deck_name"
                name="deck_name"
                placeholder="Insert deck name"
                onChange={handleChange}
                value={newDeck.deck_name}
                className="add-deck-input"
              />
              {errors.deck_name && <p className="label-error-deck">{errors.deck_name}</p>}
            </div>
            <div className="label-input">
              <label htmlFor="deck_flag" className="label-classic">
                Flag
              </label>
              <select
                name="deck_flag"
                id="deck_flag"
                className="add-deck-select"
                onChange={handleChange}
                value={newDeck.deck_flag}
              >
                <option value="0">Choose your option</option>
                <option value="flag_de">German</option>
                <option value="flag_fr">French</option>
                <option value="flag_ru">Russian</option>
                <option value="flag_es">Spanish</option>
              </select>
              {errors.deck_flag && <p className="label-error-deck">{errors.deck_flag}</p>}
              <button className="add-deck-button" type="button" onClick={handleCreateDeck}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Decks;

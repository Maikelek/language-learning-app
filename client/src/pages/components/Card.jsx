import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/Config';
import { Link } from 'react-router-dom';

const Card = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [cards, setCards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const cardsWithoutMastered = cards.filter((card) => card.card_status !== "Mastered");
    const cardLength = cardsWithoutMastered.length;

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                return;
            }

            try {
                const response = await axios.get(`${config.apiUrl}/deck/edit/${id}`, {
                    withCredentials: true,
                });

                setCards(response.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 250);
            } catch (error) {
                console.error("Error fetching cards:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = (status) => {
        const id = cardsWithoutMastered[cardIndex].card_id;
        try {
            axios.put(`${config.apiUrl}/deck/edit/${id}`, {status}, {
                withCredentials: true,
            });
        } catch (error) { 
            console.error("Error updating card:", error);
        }
        setCardIndex(cardIndex + 1);
        setIsFlipped(false);
    };

    return (
        <>
            {cardLength > 0 ? (
                <>
                    {cardIndex-1 !== cardLength-1 ? (
                        <>
                            <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
                                <div className="card-inner">
                                    <div className="card-front">
                                        {isLoading ? 'Loading...' : cardsWithoutMastered[cardIndex].card_front}
                                        <br />
                                        <p>{isLoading ? 'Loading...' : cardIndex+1 + "/" + cardLength}</p>
                                    </div>
                                    <div className="card-back">
                                        {isLoading ? 'Loading...' : cardsWithoutMastered[cardIndex].card_back}
                                    </div>
                                </div>
                            </div>

                            <div className="button-holder">
                                <button className='revise-button' onClick={() => handleNextCard("Easy")}>Easy</button>
                                <button className='edit-button' onClick={() => handleNextCard("Medium")}>Medium</button>
                                <button className='remove-button' onClick={() => handleNextCard("Hard")}>Hard</button>
                                <button className='mastered-button' onClick={() => handleNextCard("Mastered")}>Mastered</button>
                            </div>
                        </>
                    ) : (
                        <p className='deck' style={{ cursor: "default" }}>The Deck has been reviewed <Link to={"/Decks"} style={{ color: "white" }}>To menu</Link></p>
                    )}
                </>
            ) : (
                <p className='deck' style={{ cursor: "default" }}>The Deck is empty <Link to={"/Decks"} style={{ color: "white" }}>To menu</Link></p>
            )}
        </>
    );
};

export default Card;

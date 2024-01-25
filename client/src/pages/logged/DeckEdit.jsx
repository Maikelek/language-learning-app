import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config/Config";

const DeckEdit = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    id: id,
    front: "",
    back: "",
    status: "New Card",
  });
  const [loading, setLoading] = useState(true);
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardFormData, setCardFormData] = useState({});

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
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const initialCardFormData = {};
    cards.forEach((card) => {
      initialCardFormData[card.card_id] = {
        front: card.card_front,
        back: card.card_back,
        status: card.card_status,
      };
    });
    setCardFormData(initialCardFormData);
  }, [cards]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (formData.front.trim() === "" || formData.back.trim() === "") {
        setErrorMessage("Please fill in all fields");
        return;
      }

      await axios.post(`${config.apiUrl}/deck/edit`, formData, {
        withCredentials: true,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleAdd = () => {
    setIsAdding(!isAdding);
    setEditingCardId(null);
    setFormData({
      id: id,
      front: "",
      back: "",
      status: "New Card",
    });
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/deck/edit/${id}`, {
        withCredentials: true,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleEdit = (cardId) => {
    if (!isAdding) {
      setEditingCardId(cardId);
      setFormData({
        ...cardFormData[cardId],
      });
    }
  };

  const handleSaveEdit = async (cardId) => {
    try {
      await axios.put(
        `${config.apiUrl}/deck/edit/${cardId}`,
        cardFormData[cardId],
        { withCredentials: true }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error saving card:", error);
    }
    setEditingCardId(null);
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardInputChange = (cardId, field, value) => {
    setCardFormData((prevData) => ({
      ...prevData,
      [cardId]: {
        ...prevData[cardId],
        [field]: value,
      },
    }));
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
          <div style={{ margin: "auto" }}>
            <h1>Deck Name</h1>
            <button
              onClick={handleAdd}
              style={{ marginLeft: "2.5rem", marginTop: "0.5rem" }}
              className={isAdding ? "remove-button" : "revise-button"}
            >
              {isAdding ? "Stop Adding" : "Add card"}
            </button>
          </div>

          <table className="deck-table">
            <thead>
              <tr>
                <th>Card front</th>
                <th>Card back</th>
                <th>Card status</th>
                <th>Buttons</th>
              </tr>
            </thead>
            <tbody>
              {isAdding && (
                <tr>
                  <td>
                    <input
                      type="text"
                      name="front"
                      className="input-classic"
                      placeholder="Card front"
                      value={formData.front}
                      onChange={handleInputChange}
                    />
                    {errorMessage && (
                      <p style={{ color: "red", margin: "1rem 0" }}>
                        {errorMessage}
                      </p>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="back"
                      className="input-classic"
                      placeholder="Card back"
                      value={formData.back}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>New card</td>
                  <td>
                    <div className="button-holder">
                      <button
                        type="submit"
                        className="revise-button"
                        onClick={handleSubmit}
                      >
                        Add
                      </button>
                      <button onClick={handleAdd} className="remove-button">
                        Stop
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {cards.map((card) => (
                <tr key={card.card_id}>
                  <td>
                    {editingCardId === card.card_id ? (
                      <input
                        type="text"
                        name="front"
                        className="input-classic"
                        value={cardFormData[card.card_id]?.front || ""}
                        onChange={(e) =>
                          handleCardInputChange(card.card_id, e.target.name, e.target.value)
                        }
                      />
                    ) : (
                      card.card_front
                    )}
                  </td>
                  <td>
                    {editingCardId === card.card_id ? (
                      <input
                        type="text"
                        name="back"
                        className="input-classic"
                        value={cardFormData[card.card_id]?.back || ""}
                        onChange={(e) =>
                          handleCardInputChange(card.card_id, e.target.name, e.target.value)
                        }
                      />
                    ) : (
                      card.card_back
                    )}
                  </td>
                  <td>{card.card_status}</td>
                  <td>
                    <div className="button-holder">
                      {editingCardId === card.card_id ? (
                        <>
                          <button
                            className="revise-button"
                            onClick={() => handleSaveEdit(card.card_id)}
                          >
                            Save
                          </button>
                          <button
                            className="remove-button"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                        {isAdding ===  false ?
                          <button className="edit-button" onClick={() => handleEdit(card.card_id)}> Edit</button> 
                         : null}

                          <button className="remove-button" onClick={() => handleDelete(card.card_id)}>Remove</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DeckEdit;

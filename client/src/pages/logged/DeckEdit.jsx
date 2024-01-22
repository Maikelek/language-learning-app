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

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      try {
        const response = await axios.get(
          `${config.apiUrl}/deck/edit/${id}`,
          { withCredentials: true }
        );

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
  } 

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
                      onChange={handleInputChange}
                      type="text"
                      name="front"
                      className="input-classic"
                      placeholder="Card front"
                    />

                    {errorMessage && (
                      <p style={{ color: "red", margin: "1rem 0" }}>
                        {errorMessage}
                      </p>
                    )}
                  </td>
                  <td>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      name="back"
                      className="input-classic"
                      placeholder="Card back"
                    />
                    {errorMessage && (
                      <p style={{ color: "red", margin: "1rem 0" }}>
                        {errorMessage}
                      </p>
                    )}
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
                  <td>{card.card_front}</td>
                  <td>{card.card_back}</td>
                  <td>{card.card_status}</td>
                  <td>

                    <div className="button-holder">

                      <button className="edit-button">Edit</button>
                      <button className="remove-button" onClick={() => handleDelete(card.card_id)}>Remove</button>
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

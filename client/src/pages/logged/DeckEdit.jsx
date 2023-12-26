import React from "react";
import Navbar from "../components/Navbar";

const DeckEdit = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1 style={{ margin: "auto", marginTop: "1rem"}}>Deck Name</h1>
        <table className="deck-table">
          <thead>
            <tr>
              <th>Card front</th>
              <th>Card back</th>
              <th>Deck status</th>
              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deck Name</td>
              <td>Deck Description</td>
              <td>Deck Type</td>
              <td>
                <div className="button-holder">
                  <button className="edit-button">EDIT</button>
                  <button className="remove-button">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeckEdit;

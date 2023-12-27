const db = require("../db"); 

const getDecks = (req, res) => {
    const user_id = req.params.userId;

    if (!user_id) {
        return res.json({ message: "Please, insert user id !" });
    }

    db.query('SELECT * FROM decks WHERE deck_owner = ?', [user_id], async (error, results) => {
        if (error) {
            return console.log(error);
        }

        if (results.length > 0) {
            return res.json(results);
        }

        return res.json({ message: "No decks found for the user." });
    });
}

const createDeck = (req, res) => {
    const deck_name = req.body.deck_name;
    const deck_flag = req.body.deck_flag;
    const user_id = req.body.id;

    if ( !deck_name ) return res.json({ message: "Please, insert deck name !" })
    if ( !deck_flag ) return res.json({ message: "Please, insert flag !" })
    if ( !user_id ) return res.json({ message: "Please, insert user id !" })

    db.query('SELECT deck_name FROM decks WHERE deck_name = ?', [deck_name], async (error, results) =>{
        if(error) {
           return console.log(error);
        } 
        if ( results.length > 0 ) {
            return res.json({ message: "The deck name is already taken !" });
        }

        db.query('INSERT INTO decks (`deck_name`,`deck_flag`,`deck_owner`) VALUES (?,?,?)', [deck_name, deck_flag, user_id], (error, results) =>{
            if(error) {
                console.log(error);
            } else {
                return res.json({ messageGreen: "Deck was created" });
            }
        });
    });
}

module.exports = {
    getDecks,
    createDeck
};
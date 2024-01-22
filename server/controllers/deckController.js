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

const addCard = (req, res) => {
    const id  = req.body.id;
    const front = req.body.front;
    const back = req.body.back;
    const status = req.body.status;
    const q = "INSERT INTO cards (`card_front`,`card_back`,`card_status`,`from_deck`) VALUES (?,?,?,?)";

    db.query(q, [front, back, status, id], (error, results) => {
        if (error) {
            return console.log(error);
        }

        return res.json({ message: "Card was added" });
    });
}

const getCards = (req, res) => {
    const deck_id = req.params.id;
    const q = "SELECT * FROM cards WHERE from_deck = ?";

    db.query(q, [deck_id], (error, results) => {
        if (error) {
            return console.log(error);
        }

        return res.json(results);
    });
}

const deleteCard = (req, res) => {
    const card_id = req.params.id;
    const q = "DELETE FROM cards WHERE card_id = ?";

    db.query(q, [card_id], (error, results) => {
        if (error) {
            return console.log(error);
        }

        return res.json("Deleted card");
    });
}

const deleteDeck = (req, res) => {
    const deck_id = req.params.id;
    const q1 = "DELETE FROM decks WHERE deck_id = ?";
    const q2 = "DELETE FROM cards WHERE from_deck = ?";

    db.query(q1, [deck_id], (error, results) => {
        if (error) {
            return console.log(error);
        }

        db.query(q2, [deck_id], (error, results) => {
            if (error) {
                return console.log(error);
            }
            return res.json("Deleted deck");
        });

    });
}


module.exports = {
    getDecks,
    createDeck,
    addCard,
    getCards,
    deleteCard,
    deleteDeck
};
const express = require("express");
const router = express.Router();

// ==> const data = (require("flashcards.json")).data;
const { data } = require("../data/flashcards.json");
const { cards } = data;

router.get("/:id", (request, response) => {
    const { side } = request.query; // check if query contains the side parameter
    const { id } = request.params;

    const templateData = { };

    templateData.text = cards[id][side];
    
    if ( side === "question" ) {
        templateData.hint = cards[id].hint;
    }

    response.render("card", templateData);
});

module.exports = router;
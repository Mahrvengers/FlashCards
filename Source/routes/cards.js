const express = require("express");
const router = express.Router();

// ==> const data = (require("flashcards.json")).data;
const { data } = require("../data/flashcards.json");
const { cards } = data;

router.get("/:id", (request, response) => {
    response.render("card", {
        prompt: cards[request.params.id].question,
        hint: cards[request.params.id].hint
    });
});

module.exports = router;
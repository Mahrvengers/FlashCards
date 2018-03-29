const express = require("express");
const router = express.Router();

// ==> const data = (require("flashcards.json")).data;
const { data } = require("../data/flashcards.json");
const { cards } = data;

router.get("/", (request, response) => {
    response.render("card", {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Whose tomb is it?"
    });
});

module.exports = router;
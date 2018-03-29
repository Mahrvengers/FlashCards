const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.render("card", {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Whose tomb is it?"
    });
});

module.exports = router;
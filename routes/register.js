const express = require('express');
const path = require('path');

const router = express.Router();

router.post("/", (req, res) => {  
    console.log(res.body);   
});

module.exports = router;
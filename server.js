const express = require('express');
const app = express();
const port = 3000;

app.get((req, res) => {
    res.send("Hello Ms. My Ngo :> ");
})

app.listen(port, () => {
    console.log('Node API app is running on port 3000')
})
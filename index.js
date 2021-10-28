const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// used middleware ---------------------------------->

app.use(cors());
app.use(express.json());

// mongodb start ------------------------------->

app.get("/", (req, res) => {
    res.send("hello world this is home page at express js!")
});


// express server listened ------------------------>

app.listen(port, () => console.log(`express port is ${port}`));
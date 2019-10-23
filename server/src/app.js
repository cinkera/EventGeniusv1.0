const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

/* routes */
app.get('/status', (req, res) => {
    res.send({
        message: 'hello World!'
    });
});

app.listen(process.env.PORT || 8081);
console.log("express server running on port 8081");

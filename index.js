

/**
 * Required External Modules
 */
const swot = require('swot-node');
const emailable = require('emailable')("test_9214da28172e8c5a03af");
const express = require('express');
const path = require('path');
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

/**
 * Routes Definitions
 */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let email = '';
let isValid = false;

app.post('/email', (req, res) => {
    
    if (swot.isAcademic(req.body.email))
   {
    email = req.body.email;
    res.sendFile(path.join(__dirname, 'email-verification.html'));
    emailable.verify(email).then(res => {
        console.log(res);
        if (res.accept_all == true)
        {
            console.log(res.accept_all);
            isValid = true;
        }
    }).catch(error => {
        console.log(error);
    })
   } else{
    res.sendFile(path.join(__dirname, 'incorrect.html'));
   }
});

app.get('/check', (req, res) => {
    res.sendFile(path.join(__dirname, 'check.html'));
    if(isValid)
    {
        res.redirect('success');
    } else{
        res.redirect('incorrect');
    }
});

app.get('/success', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'success.html'));
});

app.get('/incorrect', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'incorrect.html'));
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
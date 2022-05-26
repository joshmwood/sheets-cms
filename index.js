const express = require('express');
const app = express();
const path = require('path');

//dot env
require('dotenv').config();

//port
const port = process.env.PORT || 3000;

// google sheets
const { google } = require('googleapis');
const keys = require('./credentials.json');


app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'))


app.get('/', (req, res) => {
    console.log("cringe");
    res.render('index');
})

// get request for albums from DOM, grabs from google sheets
app.get('/albums', async (req, res) => {

    const client = new google.auth.JWT(

        keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']

    )
    client.authorize(async (err, tokens) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log("connected");
            data = await run(client)
            res.json(data);
        }
    })
})

async function run(client) {

    const sheetsapi = google.sheets({ version: 'v4', auth: client });

    const opt = {
        // put this in ENV variables
        spreadsheetId: `${process.env.SHEETS_KEY}`,
        // change this range to the table's size
        range: 'Sheet1!A2:F'
    }

    let data = await sheetsapi.spreadsheets.values.get(opt);
    console.log(`returned from script.js: ${data.data.values}`)
    return data.data.values;

}

app.get('*', (req, res) => {
    console.log("* request");
    res.send("goodbye");
})


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
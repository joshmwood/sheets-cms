const express = require('express');
const app = express();
const path = require('path');

//dot env
require('dotenv').config();
// replace "/n" with the actual newline character
console.log(`pre regEx: ${process.env.PRIVATE_KEY}`);
const privateKey = process.env.PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")
console.log(`post regEx: ${privateKey}`);
console.log(process.env.CLIENT_EMAIL);

//port
const port = process.env.PORT || 3000;

// google sheets
const { google } = require('googleapis');
// const keys = require('./credentials.json');


app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'))


app.get('/', (req, res) => {
    console.log("cringe");
    res.render('index');
})

// get request for albums from DOM, grabs from google sheets
app.get('/albums', async (req, res) => {
    console.log('request for ALBUMSDSDSDS');
    console.log(`post regEx: ${privateKey}`);
    console.log(process.env.CLIENT_EMAIL);

    const client = new google.auth.JWT(

        process.env.CLIENT_EMAIL, null, privateKey, ['https://www.googleapis.com/auth/spreadsheets']

    )
    client.authorize(async (err, tokens) => {
        if (err) {
            console.log("error", err);
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
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', async(req, res) => {
    let response = await fetch('https://api.bjs.ojp.gov/bjs/ncvs/v2', {
        method: 'GET',
        headers: 'https://api.bjs.ojp.gov'
    })
    if (response.ok) {
        let jsonResponse = response.json();
        return res.send(jsonResponse);
    }
})








app.listen(3000, () => {
    console.log('log that bitch');
})
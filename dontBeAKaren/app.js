const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static("public"))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/home.html")
})

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/scripts.js")
})

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/styles.css")
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
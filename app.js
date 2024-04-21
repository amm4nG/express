const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(userRoute)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
})
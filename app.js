const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute');

app.use(userRoute)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
})
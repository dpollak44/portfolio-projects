const express = require('express')
const bodyParser=require("body-parser");
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(cors())

const { PORT } = process.env;

const provider_route = require('./routes/providers.js');
const patient_route = require('./routes/patients.js');
const appointment_route = require('./routes/appointments.js');
const login_route = require('./routes/login.js');
app.use('/providers', provider_route);
app.use('/patients', patient_route);
app.use('/appointments', appointment_route);
app.use('/login', login_route);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
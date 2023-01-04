import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
import session from 'express-session';
app.use(session({
  secret: 'mySecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  resave: false,
  saveUninitialized: false
}));
app.use(cors({credentials: true, origin: 'http://localhost:3002'}));

const { PORT } = process.env;

import provider_route from './routes/providers';
import patient_route from './routes/patients';
import appointment_route from './routes/appointments';
import login_route from './routes/login';
app.use('/providers', provider_route);
app.use('/patients', patient_route);
app.use('/appointments', appointment_route);
app.use('/login', login_route);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
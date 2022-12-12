const express = require('express')
const { cancelAppointmentIfNotConfirmed } = require('../modules/appointment.js');
const moment = require('moment');
const {Provider,PatientAppointment} = require('../models/index.js');
const router = express.Router()

router.get('/', async(req, res) => {
    const {patient} = req.session;
    try{
        PatientAppointment.belongsTo(Provider, {foreignKey: 'provider_id'});
        const patientAppointments = await PatientAppointment.findAll({
            where: {
                patient_id: +patient.id
            },
            include: 
                {
                    model: Provider,
                    required: true
                }
            
        });
        const mappedAppointments = patientAppointments.map((appointment) => {
            return {
                id: appointment.id,
                provider_name: appointment.provider.name,
                date: moment(appointment.date).toISOString(),
                time: moment(appointment.time, 'HH:mm').toISOString(),
                confirmed: appointment.confirmed
            }
        });
        res.status(200).send(mappedAppointments);
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error getting patient appointments', error: err});
    }
});

router.post('/new', async(req, res) => {
    try{
        const {patient} = req.session;
        const {provider_id, date, time} = req.body;
        const dateOnly = moment(req.body.date).format('YYYY-MM-DD');
        const dateTime = moment(`${dateOnly} ${req.body.time}`).format('YYYY-MM-DD HH:mm');
        //check how many hours are left before the appointment
        let hoursDif = moment().diff(moment(dateTime), 'hours');
        //only create appointment if there are more than 24 hours left
        if(hoursDif < -24){
            const appt_res = await PatientAppointment.create({
                patient_id: +patient.id,
                provider_id: +provider_id,
                date: date,
                time: time
            });
            const thirtyMinutes = 30 * 60 * 1000;      
            cancelAppointmentIfNotConfirmed(appt_res.id,thirtyMinutes);
            res.status(200).send({message: 'Patient appointment created successfully. ID is ' + appt_res.id});
        }else{
            res.status(200).send({message: 'Patient appointment cannot be created less than 24 hours in advance.'});
        }
    }
    catch(err){
        console.log(err);
        res
        .status(500)
        .send({message: 'Error creating patient appointment', error: err});
    }
});

router.post('/confirm', async(req, res) => {
    const {appointment_id} = req.body;
    try{
        const apptConfirmRes = await PatientAppointment.update({
            confirmed: true
        }, {
            where: {
                id: appointment_id
            }
        });
        if(apptConfirmRes[0] === 1){
            res.status(200).send({message: 'Patient appointment confirmed successfully',status:"success"});
        }
        else{
            res.status(400).send({message: 'Patient appointment not found',status:"not found"});
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send({message: 'Unable to confirm appointment',status:"fail"});
    }
});

module.exports = router
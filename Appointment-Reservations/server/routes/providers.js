const express = require('express')
const moment = require('moment');
const router = express.Router();
const {Provider, ProviderAvailability, PatientAppointment} = require('../models/index.js');

router.post('/create', async(req, res) => {
    const {id, name} = req.body;
    try{
        await Provider.create({
            id: +id,
            name: name
        });
        res.status(200).send({message: 'Provider created successfully'});
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error creating provider', error: err});
    }
});

router.get('/list', async(req, res) => {
    try{
        const providers = await Provider.findAll();
        res.status(200).send(providers);
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error getting providers', error: err});
    }
});

router.post('/availability', async(req, res) => {
    const {provider_id, date, start_time, end_time} = req.body;
    try{
        await ProviderAvailability.create({
            provider_id: +provider_id,
            date: date,
            start_time: start_time,
            end_time: end_time
        });
        res.status(200).send({message: 'Provider availability set successfully'});
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error creating provider availability', error: err});
    }
});

router.get('/available-dates', async(req, res) => {
    const {provider_id} = req.query;
    try{
        const providerAvailability = await ProviderAvailability.findAll({
            where: {
                provider_id: +provider_id,
            }
        });
        const providerDates = providerAvailability.map((availability) => {
            return moment(availability.date).toISOString();
        });
        res.status(200).send(providerDates);
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error getting provider availability', error: err});
    }
});

router.get('/available-times', async(req, res) => {
    const {provider_id, date} = req.query;
    const availableTimes = [];
    try{
        const providerAvailability = await ProviderAvailability.findAll({
            where: {
                provider_id: +provider_id,
                date: date
            }
        });
        const patientAppointments = await PatientAppointment.findAll({
            where: {
                provider_id: +provider_id,
                date: date
            }
        });
        const bookedStartTimes = patientAppointments.map((availability) => {
            return moment(availability.time, 'HH:mm');
        });
        for(let i of providerAvailability){
            let date = moment(i.date, 'YYYY-MM-DD');
            let startTime =  moment(i.start_time, 'HH:mm');
            const endTime = moment(i.end_time, 'HH:mm');
            while(startTime < endTime){
                // eslint-disable-next-line no-loop-func
                const isBooked = bookedStartTimes.some((bookedTime) => {
                    return bookedTime.isSame(startTime);
                });
                const dateTime = moment(date).add(startTime.hour(), 'hours').add(startTime.minute(), 'minutes');
                const hoursDiff = moment().diff(dateTime, 'hours');
                if(!isBooked && hoursDiff < -24){
                    availableTimes.push(moment(startTime).format('HH:mm'));
                }
                startTime = startTime.add(15, 'minutes');
            }
        }
        res.status(200).send(availableTimes);
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error getting provider availability', error: err});
    }
});

module.exports = router
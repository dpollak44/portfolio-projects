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
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).send({message: 'Provider already exists'});
        }
        else{
            res.status(500).send({message: 'Internal server error'});
        }
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

router.post('/add-availability', async(req, res) => {
    const {provider} = req.session;
    const {date, start_time, end_time} = req.body;
    const dateOnly = moment(date).format('YYYY-MM-DD');
    try{
        await ProviderAvailability.create({
            provider_id: +provider.id,
            date: dateOnly,
            start_time: start_time,
            end_time: end_time
        });
        res.status(200).send({message: 'Provider availability set successfully'});
    }
    catch(err){
        console.log(err);
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).send({message: 'Provider availability already exists'});
        }
        else{
            res.status(500).send({message: 'Internal server error'});
        }
    }
});

router.get('/available-dates', async(req, res) => {
    const {provider_id} = req.query;
    if(!provider_id){
        res.status(400).send({message: 'Missing provider_id'});
    }
    try{
        const providerAvailability = await ProviderAvailability.findAll({
            where: {
                provider_id: +provider_id
            },
            distinct: true,
        });
        const providerDates = providerAvailability.map((availability) => {
            return moment(availability.date).format('YYYY-MM-DD');
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
    if(!provider_id || !date){
        res.status(400).send({message: 'Missing provider_id or date'});
    }
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
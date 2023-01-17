import express, { Request, Response } from 'express';
import {cancelAppointmentIfNotConfirmed} from '../modules/appointment';
import moment from 'moment';
import {Provider,PatientAppointment} from '../models/index';


declare module 'express-session' {
    export interface SessionData {
        patient: { [key: string]: any };
    }
  }

const router = express.Router()

router.get('/', async(req, res) => {
    console.log('hello')
    console.log(req.session.patient);
    const {patient} = req.session;
    console.log(patient);
    try{
        PatientAppointment.belongsTo(Provider, {foreignKey: 'provider_id'});
        const patientAppointments = await PatientAppointment.findAll({
            where: {
                patient_id: +patient!.id
            },
            include: [Provider]
        });
        console.log(patientAppointments);
        const mappedAppointments = patientAppointments.map((appointment) => {
            const {provider_id, appointment_id, confirmed, time, date, provider} = appointment;
            return {
                provider_id,
                appointment_id,
                confirmed,
                time,
                date,
                provider
            }
        }
        );
        res.status(200).send({message: 'Appointments fetched successfully', appointments: mappedAppointments});
    }
    catch(err){
        console.log(err);
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
                patient_id: +patient!.id,
                provider_id: +provider_id,
                date: date,
                time: time
            });
            const thirtyMinutes = 30 * 60 * 1000;      
            cancelAppointmentIfNotConfirmed(appt_res.appointment_id, thirtyMinutes);
            res.status(200).send({message: 'Patient appointment created successfully. ID is ' + appt_res.appointment_id});
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
                appointment_id: +appointment_id
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

export default router;
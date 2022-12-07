import React,{useState} from 'react';
import Login from './Login.js';
import BookAppointment from './BookAppointment.js';
import Appointments from './Appointments.js';
import {getPatientAppointments,confirmAppointment} from '../utils/api.js';

const Patients = () => {
    const [patient_id, setPatientId] = useState('');
    const [appointments, setAppointments] = useState([]);

    const refreshAppointments = () => {
        (async () => {
            const res = await getPatientAppointments(patient_id);
            console.log(res)
            setAppointments(res);
        })();
    }

    const display = patient_id ? 
    <>
        <BookAppointment patient_id={patient_id} refreshAppointments={refreshAppointments}/>
        <Appointments appointments={appointments} refreshAppointments={refreshAppointments}  confirmAppointment={confirmAppointment}/>
    </>
    : <Login type="Patient" handleSetId={setPatientId}/>


    return (
        <div className="page">
             {display}
        </div>
    );
    }


export default Patients

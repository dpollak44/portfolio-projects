import React,{useState} from 'react';
import Login from './Login';
import BookAppointment from './BookAppointment';
import Appointments from './Appointments';
import {getPatientAppointments,confirmAppointment} from '../utils/api'

const Patients = () => {
    const [patient_id, setPatientId] = useState('');
    const [appointments, setAppointments] = useState([]);

    const refreshAppointments = () => {
        (async () => {
            const res = await getPatientAppointments();
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

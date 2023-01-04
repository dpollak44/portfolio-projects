import { PatientAppointment } from '../models/index.js';

const asyncTimeout = (ms: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This function is called when a patient makes an appointment
// It takes an appointment id and an amount of time to wait before cancelling the appointment if not confirmed
const cancelAppointmentIfNotConfirmed = async(appointment_id: number,ms: number) => {
    await asyncTimeout(ms);
    const appointment = await PatientAppointment.findOne({
        where: {
            appointment_id: appointment_id
        }
    });
    if(appointment){
        if(!appointment.confirmed){
            await PatientAppointment.destroy({
                where: {
                    appointment_id: appointment_id
                }
            });
        }
    }
};

export {
    cancelAppointmentIfNotConfirmed
}
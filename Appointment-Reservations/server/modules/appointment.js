const { PatientAppointment } = require('../models/index.js');

const asyncTimeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This function is called when a patient makes an appointment
// It takes an appointment id and an amount of time to wait before cancelling the appointment if not confirmed
const cancelAppointmentIfNotConfirmed = async(appointment_id,ms) => {
    await asyncTimeout(ms);
    const appointment = await PatientAppointment.findOne({
        where: {
            id: appointment_id
        }
    });
    if(appointment){
        if(!appointment.confirmed){
            await PatientAppointment.destroy({
                where: {
                    id: appointment_id
                }
            });
        }
    }
};

module.exports = {
    cancelAppointmentIfNotConfirmed
}
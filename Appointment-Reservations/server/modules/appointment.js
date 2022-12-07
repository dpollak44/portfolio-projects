const { PatientAppointment } = require('../models/index.js');

const asyncTimeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
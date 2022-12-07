import { parseISO } from 'date-fns';

const baseUrl = 'http://localhost:5000';

const getProviders = async () => {
    const res = await fetch(`${baseUrl}/providers/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}

const setProviderAvailability = async (providerId, date, startTime,endTime) => {
    const res = await fetch(`${baseUrl}/providers/availability`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            provider_id: providerId,
            date: date,
            start_time: startTime,
            end_time: endTime
        }),
    });
    const message = await res.json();
    return message;
};

const bookPatientAppointment = async (patientId, providerId, date, time) => {
    const res = await fetch(`${baseUrl}/appointments/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            patient_id: patientId,
            provider_id: providerId,
            date: date,
            time: time
        }),
    });
    const message = await res.json();
    return message;
};

const getProviderDates = async (providerId) => {
    const res = await fetch(`${baseUrl}/providers/available-dates?provider_id=${providerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    const isoDates = data.map(date => parseISO(date));
    return isoDates;
}

const getProviderTimes = async (providerId, date) => {
    const res = await fetch(`${baseUrl}/providers/available-times?provider_id=${providerId}&date=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    const times_with_date = data.map(time => {
        const date_time = new Date(date);
        date_time.setHours(time.split(':')[0]);
        date_time.setMinutes(time.split(':')[1]);
        return date_time;
    });
    return times_with_date;
}

const getPatientAppointments = async (patientId) => {
    const res = await fetch(`${baseUrl}/appointments?patient_id=${patientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}

const confirmAppointment = async (appointmentId) => {
    try{
        const res = await fetch(`${baseUrl}/appointments/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                appointment_id: appointmentId
            }),
        });
        const jsonRes = await res.json();
        return jsonRes.message;
    } catch (err) {
        return err;
    }
}

const login = async (type,id) => {
    const res = await fetch(`${baseUrl}/login?type=${type}&id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const status = res.status;
    const message = await res.json();
    return {status, message};
}




export {
    getProviders,
    setProviderAvailability,
    bookPatientAppointment,
    getProviderDates,
    getProviderTimes,
    getPatientAppointments,
    confirmAppointment,
    login
}
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

const setProviderAvailability = async(providerId: any, date: any, startTime: any, endTime: any) => {
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
}

const bookPatientAppointment = async (patientId: string, providerId: string, date: any, time: string) => {
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

const getProviderDates = async (providerId: string) => {
    const res = await fetch(`${baseUrl}/providers/available-dates?provider_id=${providerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    const isoDates = data.map((date:any) => parseISO(date));
    return isoDates;
}

const getProviderTimes = async (providerId: string, date: any) => {
    const res = await fetch(`${baseUrl}/providers/available-times?provider_id=${providerId}&date=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    const times_with_date = data.map((time:any) => {
        const date_time = new Date(date);
        date_time.setHours(time.split(':')[0]);
        date_time.setMinutes(time.split(':')[1]);
        return date_time;
    });
    return times_with_date;
}

const getPatientAppointments = async () => {
    try{
        const res = await fetch(`${baseUrl}/appointments`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    }catch (err) {
        return err;
    }
}

const confirmAppointment = async (appointmentId: string) => {
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

const login = async (type: string,id: string) => {
    try{
        const res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                id: id
            }),
        });
        const jsonRes = await res.json();
        return jsonRes;
    } catch (err) {
        return err;
    }
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
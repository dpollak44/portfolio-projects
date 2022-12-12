import { parseISO } from 'date-fns';

const baseUrl = 'http://localhost:5000';

const getProviders = async () => {
    try{
        const res = await fetch(`${baseUrl}/providers/list`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err;
    }
}

const setProviderAvailability = async (date, startTime,endTime) => {
    try{
        const res = await fetch(`${baseUrl}/providers/add-availability`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                date: date,
                start_time: startTime,
                end_time: endTime
            }),
        });
        const jsonRes = await res.json();
        const message = jsonRes.message;
        return message;
    }
    catch (err) {
        return err;
    }
};

const bookPatientAppointment = async (providerId, date, time) => {
    try{
        const res = await fetch(`${baseUrl}/appointments/new`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider_id: providerId,
                date: date,
                time: time
            }),
        });
        const jsonRes = await res.json();
        const message = jsonRes.message;
        return message;
    }
    catch (err) {
        return err;
    }
};

const getProviderDates = async (providerId) => {
    try{
        const res = await fetch(`${baseUrl}/providers/available-dates?provider_id=${providerId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        const isoDates = data.map(date => parseISO(date));
        return isoDates;
    } catch (err) {
        return err;
    }
}

const getProviderTimes = async (providerId, date) => {
    try{
        const res = await fetch(`${baseUrl}/providers/available-times?provider_id=${providerId}&date=${date}`, {
            method: 'GET',
            credentials: 'include',
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
    }catch (err) {
        return err;
    }
}

const getPatientAppointments = async (patientId) => {
    try{
        const res = await fetch(`${baseUrl}/appointments?patient_id=${patientId}`, {
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

const confirmAppointment = async (appointmentId) => {
    try{
        const res = await fetch(`${baseUrl}/appointments/confirm`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                appointment_id: appointmentId
            }),
        });
        const jsonRes = await res.json();
        return jsonRes;
    } catch (err) {
        return err;
    }
}

const login = async (type,id) => {
    try{
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                id: id
            })
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
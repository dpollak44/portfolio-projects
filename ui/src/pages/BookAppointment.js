import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getProviders, getProviderDates, getProviderTimes, bookPatientAppointment} from '../utils/api.js';
import DatePicker from "react-datepicker";

const BookAppointment = ({patient_id,refreshAppointments}) => {
    const [providers, setProviders] = useState([]);
    const [provider, setProvider] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        (async () => {
            const providers = await getProviders();
            setProviders(providers);
        })();
    }, []);

    const handleProviderChange = (e) => {
        (async ()=>{
            setProvider(e.target.value);
            const availDates = await getProviderDates(e.target.value);
            setAvailableDates(availDates);
        })();
    }
    
    const handleDateChange = (date) => {
        (async ()=>{
            setDate(date);
            const availTimes = await getProviderTimes(provider, date);
            setAvailableTimes(availTimes);
        })();
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let timeString = time.getHours() + ":" + time.getMinutes();
        await bookPatientAppointment(patient_id, provider, date, timeString);
        setProvider('');
        setDate('');
        setTime('');
        refreshAppointments();
    }

    return (
        <Container className="book-appointment">
            <h1>Book Appointment</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Select aria-label="select-provider" name = "select-provider" id = "select-provider" value={provider} onChange={(e) => handleProviderChange(e)}>
                            <option>Select a Provider</option>
                            {providers.length > 0 && providers.map((provider) => (
                                <option key={provider.id} value = {provider.id}>{provider.name}</option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <DatePicker
                    placeholderText="Choose a Date"
                    selected={date}
                    onChange={(date) => handleDateChange(date)}
                    minDate={new Date(new Date()).setDate(new Date().getDate() + 1)}
                    includeDates={availableDates}
                    popperPlacement="bottom"
                    popperModifiers={[
                    {
                        name: "flip",
                        options: {
                        fallbackPlacements: ["bottom"],
                        allowedAutoPlacements: ["bottom"],
                        },
                    },
                    ]}
                />
                <DatePicker
                    placeholderText="Choose a Time"
                    selected={time}
                    onChange={setTime}
                    minDate={new Date()}
                    includeTimes={availableTimes}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    popperPlacement="bottom"
                    popperModifiers={[
                    {
                        name: "flip",
                        options: {
                        fallbackPlacements: ["bottom"],
                        allowedAutoPlacements: ["bottom"],
                        },
                    },
                    ]}
                />
                <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                        Submit
                </Button>
            </Form>
        </Container>
    );
    }


export default BookAppointment

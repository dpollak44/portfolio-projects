import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setProviderAvailability} from '../utils/api.js';
import "react-datepicker/dist/react-datepicker.css";

const SetAvailability = ({provider_id}) => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setDate('');
        setStartTime('');
        setEndTime('');
        const message = await setProviderAvailability(
                date,
                startTime.getHours() + ":" + startTime.getMinutes(),
                endTime.getHours() + ":" + endTime.getMinutes()
        );
        alert(message);
    }


return (
    <Container className="set-provider-availability">
            <h1>Set Provider Availability</h1>
            <Form>
                <DatePicker
                    placeholderText="Choose a Date"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={new Date()}
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
                placeholderText="Choose a Start Time"
                    selected={startTime}
                    onChange={setStartTime}
                    minDate={new Date(new Date()).setDate(new Date().getDate() + 1)}
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
                <DatePicker
                    placeholderText="Choose an End Time"
                    selected={endTime}
                    onChange={setEndTime}
                    minDate={new Date()}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
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

export default SetAvailability
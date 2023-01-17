import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setProviderAvailability} from '../utils/api';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    provider_id: string;
}

const tomorrow = new Date(new Date()).setDate(new Date().getDate() + 1);
console.log(tomorrow);

const SetAvailability = ({provider_id}: Props) => {
    const [date, setDate] = useState<Date | null>();
    const [startTime, setStartTime] = useState<Date | null>();
    const [endTime, setEndTime] = useState<Date | null>();
    const [minDate] = useState<Date | null>(new Date(tomorrow));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStartTime(null);
        setEndTime(null);
        setProviderAvailability(provider_id, date, startTime?.getHours() + ":" + startTime?.getMinutes(), endTime?.getHours() + ":" + endTime?.getMinutes());
    }


return (
    <Container className="set-provider-availability">
            <h1>Set Provider Availability</h1>
            <Form onSubmit={handleSubmit}>
                <DatePicker
                    placeholderText="Choose a Date"
                    selected={date}
                    onChange={(date:any) => setDate(date)}
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
                    minDate={minDate}
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    </Container>
);
}

export default SetAvailability
import React,{useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface AppointmentsProps {
    appointments: any[];
    refreshAppointments: () => void;
    confirmAppointment: (id: string) => Promise<string>;
}

const Appointments = ({appointments,refreshAppointments,confirmAppointment}:AppointmentsProps) => {

        useEffect(() => {
            refreshAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const onConfirmAppointment = async(id: string) => {
            const message = await confirmAppointment(id);
            alert(message);
        }

        const tableAppointments = appointments.length > 0 ?
            appointments.map((appointment) => {
                return (
                        <tr key={appointment.id} id={appointment.id}>
                            <td>{appointment.provider_name}</td>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                            <td>{new Date(appointment.time).toLocaleTimeString()}</td>
                            <td>
                                {!appointment.confirmed ?
                                <Button variant="warning" onClick={() => onConfirmAppointment(appointment.id)}>Confirm</Button>
                                    : <Button variant="success" disabled>Confirmed</Button>
                                }
                            </td>
                        </tr>
                    )
            })
            : <tr><td colSpan={4}>No appointments</td></tr>;

  
    return (
        <Container className="appointment-history">
            <h1>View Appointments</h1>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Provider ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Confirm</th>
                        </tr>
                 </thead>
                <tbody>
                    {tableAppointments}
                </tbody>
            </Table>
        </Container>
    );
}


export default Appointments
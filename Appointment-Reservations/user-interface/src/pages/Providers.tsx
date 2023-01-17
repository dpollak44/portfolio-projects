import React, { useState } from "react";
import {setProviderAvailability} from '../utils/api';
import SetAvailability from "./SetAvalilability";
import Login from "./Login";
import "react-datepicker/dist/react-datepicker.css";

const Providers = () => {
    const [provider_id, setProviderId] = useState('');

    const display = provider_id ? 
        <SetAvailability provider_id={provider_id}/>
        : <Login type="Provider" handleSetId={setProviderId}/>

    return (
        <div className="page">
            {display}
        </div>
    );
    }

export default Providers
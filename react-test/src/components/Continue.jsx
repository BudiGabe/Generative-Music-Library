import React, { useEffect, useState } from 'react';

import ControlledSelect from './ControlledSelect';
import { getSampleById, getSamplesNew, saveSample } from "../Services/sample-service";
import { Button } from "@mui/material";
import { combine_sample, continue_sample } from "../Services/magenta-service";
import Sample from "./Sample";

export const Combine = () => {
    const [value1, setValue1] = useState('');
    const [samples, setSamples] = useState(null);
    const [newSample, setNewSample] = useState(null)
    const [continued, setContinued] = useState(false)

    useEffect(() => {
        getSamplesNew().then(samples => setSamples(samples));
    }, [])

    const handleChange1 = (value) => {
        console.log(`value: ${value}`);
        setValue1(value);
    };

    const handleContinue = async () => {
        const sample1 = await getSampleById(value1)
        continue_sample(sample1, 16, 5).then(sample => {
            sample.name = sample1.name + " continued"
            setNewSample(sample)
            setContinued(true)
            saveSample(sample)
        })
    }

    if (samples === undefined) {
        return <>Still loading</>
    }

    if (continued === true) {
        return <Sample sample={newSample}/>
    }
    return (
        <div>
            <label>First Sample:</label>
            <ControlledSelect value={value1} options={samples} onChange={handleChange1} />
            <Button onClick={handleContinue} variant="contained">Continue</Button>
        </div>
    );
};

export default Combine;

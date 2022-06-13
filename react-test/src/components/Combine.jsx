import React, { useEffect, useState } from 'react';

import ControlledSelect from './ControlledSelect';
import { getSampleById, getSamplesNew, saveSample } from "../Services/sample-service";
import { Button } from "@mui/material";
import { combine_sample } from "../Services/magenta-service";
import Sample from "./Sample";

export const Combine = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [samples, setSamples] = useState(null);
    const [newSample, setNewSample] = useState(null)
    const [combined, setCombined] = useState(false)

    useEffect(() => {
        getSamplesNew().then(samples => setSamples(samples));
    }, [])

    const handleChange1 = (value) => {
        console.log(`value: ${value}`);
        setValue1(value);
    };

    const handleChange2 = (value) => {
        console.log(`value: ${value}`);
        setValue2(value);
    };

    const handleCombine = async () => {
        const sample1 = await getSampleById(value1)
        const sample2 = await getSampleById(value2)
        combine_sample(sample1, sample2, 5).then(sample => {
            sample.name = sample1.name + " + " + sample2.name
            setNewSample(sample)
            setCombined(true)
            saveSample(sample)
        })
    }

    if (samples === undefined) {
        return <>Still loading</>
    }

    if (combined === true) {
        return <Sample sample={newSample}/>
    }
    return (
        <div>
            <label>First Sample:</label>
            <ControlledSelect value={value1} options={samples} onChange={handleChange1} />
            <label>Second Sample:</label>
            <ControlledSelect value={value2} options={samples} onChange={handleChange2} />
            <Button onClick={handleCombine} variant="contained">Combine</Button>
        </div>
    );
};

export default Combine;

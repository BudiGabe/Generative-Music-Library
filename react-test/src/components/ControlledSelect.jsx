import React, { Component, useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ControlledSelect({name, value, options, onFocus, onChange, onBlur}) {
    const [localValue, setLocalValue] = useState(value ?? '')
    useEffect(() => setLocalValue(value ?? ''), [value])

    // getSamplesNew().then(samples => setSamples(samples))

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setLocalValue(value);
        if (onChange) {
            onChange(value);
        }
    };
    const handleBlur = (e) => {
        if (onBlur) {
            onBlur(e.target.value);
        }
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sample</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="FirstSample"
                onChange={handleChange}
            >
                {options?.map(option => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name ?? option.id}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    )
}

export default ControlledSelect

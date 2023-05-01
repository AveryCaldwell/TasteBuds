import React, { useState } from 'react';

// This is for each infividual input to be mapped out into the form
const EditInput = (props) => {

    // shows focus
    const [focused, setFocused] = useState(false);

    // destructures props 
    const { label, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    // Time handler
    const handler = (e) => {
        props.setUpdateTime(e.target.value);
    };

    // Time input
    if (props.name === 'time') {
        return (
            <div className='formInput mx-auto flex flex-col'>

                {/* LABEL */}
                <label
                    className='p-2 text-darkest font-titan
                      xl:text-2xl'
                >
                    {label}
                </label>

                {/* INPUT */}
                <input
                    className='p-2 rounded
               xl:text-2xl'
                    {...inputProps}
                    onChange={handler}
                    onBlur={handleFocus}
                    onFocus={() =>
                        inputProps.name === 'confirmPassword' &&
                        setFocused(true)
                    }
                    focused={focused.toString()}
                    id='calendarUpdate'
                />
            </div>
        );
    } else {

        // All other inputs
        return (
            <div className='formInput mx-auto flex flex-col'>
                <label
                    className='p-2 text-darkest font-titan
                      xl:text-2xl'
                >
                    {label}
                </label>
                <input
                    className='p-2 rounded
               xl:text-2xl'
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() =>
                        inputProps.name === 'confirmPassword' &&
                        setFocused(true)
                    }
                    focused={focused.toString()}
                />
            </div>
        );
    }
};

export default EditInput;

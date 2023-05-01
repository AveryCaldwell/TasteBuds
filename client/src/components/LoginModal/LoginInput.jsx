import React, { useState } from 'react';
import './logininput.css';

// This is for each infividual input to be mapped out into the form
const LoginInput = (props) => {

    // shows focus
    const [focused, setFocused] = useState(false);

    // destructures props 
    const { label, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className='formInput mx-auto flex flex-col'>

            {/* LABEL */}
            <label
                className='p-2 text-hotpink font-titan
                          xl:text-2xl'
            >
                {label}
            </label>

            {/* INPUT */}
            <input
                className='p-2 rounded
                   xl:text-2xl'
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === 'confirmPassword' && setFocused(true)
                }
                focused={focused.toString()}
            />
        </div>
    );
};

export default LoginInput;

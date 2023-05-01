import React, { useState } from 'react';
import './signupinput.css';


// This is for each infividual input to be mapped out into the form
const SignUpInput = (props) => {

    // shows focus
    const [focused, setFocused] = useState(false);

    // destructures props 
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };
    return (
        <div className='formInput mx-auto flex flex-col '>

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

            {/* if an input is wrong, show error message tied to that input  */}
            <span className='text-[10px] text-aboutbg font-manrope font-semibold mt-1 error'>
                {errorMessage}
            </span>
        </div>
    );
};

export default SignUpInput;

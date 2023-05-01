import React, { useState } from 'react';
import './commentinput.css';

// This is for each infividual input to be mapped out into the form
const CommentInput = (props) => {

    // shows focus
    const [focused, setFocused] = useState(false);

    // destructures props 
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className='formInput mx-auto flex  flex-col py-10 '>

            {/* LABEL */}
            <label
                htmlFor='comment'
                className='text-darkest text-sm leading-lg pb-1 font-manrope mb-2 font-bold 
                              lg:text-lg
                              xl:text-xl'
            >
                {label}
            </label>

            {/* INPUT */}
            <textarea
                className='rounded border border-pink bg-white text-slate-800 font-[500] p-1
                         xl:text-xl'
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === 'confirmPassword' && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className='text-[10px] text-orange font-manrope font-semibold mt-1 error'>
                {errorMessage}
            </span>
        </div>
    );
};

export default CommentInput;

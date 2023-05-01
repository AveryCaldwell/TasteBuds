import React, { useState } from 'react';
import SignUpInput from './SignUpInput';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

// takes props from page being passed through
const SignUpModal = ({ signUpModal, toggleSignUpModal }) => {

    // --------------- SIGN UP VALUES AND INPUTS --------------- //
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // define mutation for adding a user
    const [newUser, { error }] = useMutation(NEW_USER);

    // handles changing the inputs from line 11
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // 
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        // checks validity of inputs and makes sure they're entered and meets the requirements to proceed
        if (form.checkValidity() === false) {
            // if false run:
            event.preventDefault();
            event.stopPropagation();
        }

        // if inputs are valid, try to run newUser mutation function to make new user using userFormData
        try {
            const { data } = await newUser({
                variables: { ...userFormData },
            });
            // Login with newUser token 
            Auth.login(data.newUser.token);
        } catch (err) {
            console.error(err);
        }

        // resets inputs
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    // inputs are entered into an array so we can map them later on a card
    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: 'Username',
            pattern: '^[A-Za-z0-9]{3,16}$',
            required: true,
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'It should be a valid email address!',
            label: 'Email',
            required: true,
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage:
                'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            label: 'Password',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    // --------------- SIGN UP --------------- //

    return (
        <div className='w-full flex'>
            {signUpModal && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
                flex justify-center items-center w-full'
                >
                    <div className='overlay'>
                        <div
                            className='modal-content bg-orange border border-darkest bg-opacity-80 rounded-lg p-4 drop-shadow-xl w-[300px] 
                        sm:w-[400px]
                        xl:w-[800px]'
                        >
                            <div className='xl:py-8'>
                                <h1
                                    className='text-center font-titan text-hotpink text-2xl
                                               xl:text-4xl'
                                >
                                    Sign Up!
                                </h1>

                                {/* SIGN UP FORM  */}
                                <form className='' onSubmit={handleFormSubmit}>

                                    {/* takes the input array defined in hook section and maps them out into a form */}
                                    {inputs.map((input) => (
                                        <SignUpInput
                                            key={input.id}
                                            {...input}
                                            value={userFormData[input.name]}
                                            onChange={handleInputChange}
                                        />
                                    ))}
                                    <div className='flex flex-row justify-center'>

                                        {/* Submit button */}
                                        <button
                                            className='mt-4 mx-auto text-center rounded-lg bg-hotpink text-navnametext font-bowlby text-cream  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                                                          xl:text-2xl'
                                            type='submit'
                                            variant='success'
                                        >
                                            Submit
                                        </button>

                                        {/* Close button */}
                                        <button
                                            className='close-modal mt-4 mx-auto text-center rounded-lg bg-hotpink text-navnametext font-bowlby text-cream  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                                                       xl:text-2xl'
                                            onClick={toggleSignUpModal}
                                        >
                                            CLOSE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpModal;

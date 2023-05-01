import React, { useState } from 'react';
import LoginInput from './LoginInput';

import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

const LoginModal = ({ loginModal, toggleLoginModal }) => {

    // --------------- LOGIN VALUES AND INPUTS --------------- //
    const [userFormData, setUserFormData] = useState({
        username: '',
        password: '',
    });

    // inputs are entered into an array so we can map them later on a card
    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'Username',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password',
            required: true,
        },
    ];

    // defines login mutation for logging in
    const [login] = useMutation(LOGIN_USER);

    // --------------- LOGIN METHODS --------------- //

    // handles changing the inputs from line 11
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setUserFormData(event.target.username.value);


        const form = event.currentTarget;

        // checks validity of inputs and makes sure they're entered and meets the requirements to proceed
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            // console.log('userFormData: ', userFormData);

            // if inputs are valid, try to run login using userFormData, also navigates to listings page
            const { data } = await login({
                variables: { ...userFormData },
            });

            console.log(data);

            // makes token from auth
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        // resets inputs
        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <div className='w-full flex'>
            {loginModal && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
                flex justify-center items-center w-full'
                >
                    <div className='overlay'>

                        <div
                            className='modal-content bg-orange bg-opacity-80 border border-darkest  rounded-lg p-4 drop-shadow-xl w-[300px] 
                        sm:w-[400px]
                        xl:w-[800px]'
                        >
                            <div className='xl:py-8'>
                                <h1
                                    className='text-center font-titan text-hotpink text-2xl
                                               xl:text-4xl'
                                >
                                    Login
                                </h1>

                                {/* LOGIN FORM */}
                                <form className='' onSubmit={handleFormSubmit}>
                                    {/* takes the input array defined in hook section and maps them out into a form */}
                                    {inputs.map((input) => (
                                        <LoginInput
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
                                            onClick={toggleLoginModal}
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

export default LoginModal;

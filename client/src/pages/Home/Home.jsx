import React, { useState } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import SignUpModal from '../../components/SignUpInput/SignUpModal';
import Logo from '../../assets/logo-icon.png';

const Home = () => {
    // Logic to toggle the Login and Sign Up modals
    const [loginModal, setLoginModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const toggleLoginModal = () => {
        setLoginModal(!loginModal);
    };
    const toggleSignUpModal = () => {
        setSignUpModal(!signUpModal);
    };
    return (
        <div className=' flex flex-col mx-auto'>
            {/* Greetings Section <--to--> Not a Member? */}
            <div className='flex flex-col m-8 px-4'>
                <h1
                    className=' py-5 mt-10 text-3xl font-bowlby text-hotpink text-center drop-shadow-lg
        md:text-center md:text-5xl
        xl:text-6xl'
                >
                    WELCOME <br className='md:hidden' />
                    TO <br />
                </h1>
                {/* LOGO IMAGE */}
                <div>
                    <img
                        src={Logo}
                        alt='logo'
                        class='object-scale-down md:object-scale-down mx-auto h-48 w-96 '
                    />
                </div>
                <p
                    className='  py-5 text-xl text-hotpink text-center drop-shadow-lg
                    sm:text-3xl
        md:text-center md:text-5xl
        xl:text-4xl'
                >
                    "Where foodies become besties."
                </p>

                {/* Login */}
                <p
                    className=' text-center font-bowlby text-apricot drop-shadow-lg text-lg pt-5 m-2
                    sm:text-2xl
        xl:text-4xl'
                >
                    Not a member?
                </p>
            </div>

            {/* SignUp and Login */}
            <div className='flex flex-col justify-center  mx-auto items-center gap-2
            md:flex-row '>

                {/* Sign Up */}
                <div className='flex justify-center'>
                    <button
                        onClick={toggleSignUpModal}
                        className='text-xl py-2 font-manrope text-hotpink bg-orange rounded-lg w-[180px]
                         md:py-5 md:bg-blue md:font-bowlby md:text-hotpink    md:p-2 md:drop-shadow-md
                         md:mt-4 md:mx-auto md:text-base
                         xl:text-2xl'
                    >
                        Sign Up!
                    </button>
                </div>

                {/* Login */}
                <div className='flex justify-center'>
                    <button
                        onClick={toggleLoginModal}
                        id='loginButton'
                        className='text-xl py-2 font-manrope text-hotpink bg-orange rounded-lg w-[180px]
                         md:py-5 md:bg-blue md:font-bowlby md:text-hotpink md:p-2 md:drop-shadow-md
                         md:mt-4 md:mx-auto md:text-base
                         xl:text-2xl'
                    >
                        Login
                    </button>
                </div>

                {/* Modals at bottom because they have issues when inside the div with the button. It also passes the modal functions through to the modal file*/}
                <SignUpModal
                    className=''
                    signUpModal={signUpModal}
                    setSignUpModal={setSignUpModal}
                    toggleSignUpModal={toggleSignUpModal}
                />
                <LoginModal
                    className=''
                    loginModal={loginModal}
                    setLoginModal={setLoginModal}
                    toggleLoginModal={toggleLoginModal}
                />
            </div>
        </div>
    );
};

export default Home;

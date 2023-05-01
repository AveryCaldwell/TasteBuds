import React from 'react';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from './LoginModal/LoginModal';
import SignUpModal from './SignUpInput/SignUpModal';
import { Link } from 'react-router-dom';
import NavLogo from '../assets/logo-nav.png';
import Logo from '../assets/logo-icon.png';
import auth from '../utils/auth';

const Navbar = ({ currentPage, handlePageChange }) => {

    // toggles navbar mobile menu
    const [toggleNavMenu, setToggleNavMenu] = useState(false);

    // Login and SignUp Logic
    const [loginModal, setLoginModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const toggleLoginModal = () => {
        setLoginModal(!loginModal);
    };
    const toggleSignUpModal = () => {
        setSignUpModal(!signUpModal);
    };

    return (
        <div
            className='w-full py-3 relative bg-coral
                        lg:py-1 '
        >
            {/* // MONITORS */}
            <div className='hidden md:flex flex-row justify-between items-center px-4'>
                <img
                    src={NavLogo}
                    alt='NavLogo'
                    className='w-1/5  hidden lg:block  md:object-scale-down md:flex flex-row justify-between items-center px-4'
                />
                <div className=''>
                    {/* ----------LOGO------- */}
                    <p className=' lg:hidden md:hidden sm:block text-4xl py-5 font-anrope text-white '>
                        TasteBuds
                    </p>
                </div>
                <ul className='flex items-center justify-end my-auto font-bowlby pr-4'>

                    {/* "if logged in show these options in navbar" */}
                    {auth.loggedIn() ? (
                        <>
                            {/* personal profile */}
                            <li
                                className='text-2xl py-5  text-white pr-4
                            hover:text-orange duration-150'
                            >
                                <Link to='/admin'>Profile</Link>
                            </li>

                            {/* page of all events */}
                            <li
                                className='text-2xl py-5 text-white pr-4
                            hover:text-orange duration-150'
                            >
                                <Link to='/listings'>Listings</Link>
                            </li>

                            {/* logout */}
                            <li
                                className='text-2xl py-5  text-white pr-4
                            hover:text-orange duration-150'
                            >
                                {/* when clicked run logout function in utils/logout */}
                                <Link to='/' onClick={auth.logout}>
                                    Logout
                                </Link>
                            </li>
                        </>
                        // if not logged in then show these options (nothing)
                    ) : (
                        <></>
                    )}
                </ul>
            </div>

            {/* ------------MOBILE------------ */}
            <div className='md:hidden flex flex-row justify-between items-center px-4 w-full'>

                {/* if nav menu isn't toggled show tastebuds, if it is toggled hide tastebudes so navbar can cover screen */}
                {toggleNavMenu ? (
                    ''
                ) : (
                    <h1 className='text-white text-lg'>TasteBuds</h1>
                )}

                {/* if nav menu isn't toggled show hamburger menu, if it is toggled hide hamburger menu so navbar can cover screen */}
                {toggleNavMenu ? (
                    ''
                ) : (
                    // hamburger menu, opens the navbar to colver the screen
                    <FaBars
                        className='text-white'
                        size={27}
                        onClick={() => setToggleNavMenu((prev) => !prev)}
                    />
                )}

                {/* MOBILE NAVBAR */}
                {toggleNavMenu && (
                    <div className='flex flex-col w-full'>

                        {/* Close button */}
                        <FaTimes
                            className='text-white  right-4'
                            size={27}
                            onClick={() => setToggleNavMenu((prev) => !prev)}
                        />

                        {/* MENU */}
                        <div className='z-10 h-screen flex justify-center items-center'>
                            <div className='text-orange  sm:text-xl text-center w-full flex flex-col justify-center'>

                                {/* if logged in, shows these nevbar options */}
                                {auth.loggedIn() ? (
                                    <>

                                    {/* Personal Profile */}
                                        <Link
                                            className='text-2xl py-5 font-manrope text-white
                                        hover:text-apricot duration-150'
                                            to='/admin'
                                            onClick={() =>
                                                setToggleNavMenu(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            Profile
                                        </Link>

                                        {/* Page of all events */}
                                        <Link
                                            className='text-2xl py-5 font-manrope text-white
                                        hover:text-orange duration-150'
                                            to='/listings'
                                            onClick={() =>
                                                setToggleNavMenu(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            Listings
                                        </Link>

                                        {/* Logout */}
                                        <Link
                                            className='text-2xl py-5 font-manrope text-white
                                        hover:text-apricot duration-150'
                                            to='/'
                                            onClick={auth.logout}
                                        >
                                            Logout
                                        </Link>
                                    </>

                                    // If NOT logged in show signup/login modal
                                ) : (
                                    <>
                                        <div className='flex flex-col justify-center mx-auto my-auto items-center gap-2'>

                                            {/* Sign up */}
                                            <div className='flex justify-center'>
                                                <button
                                                    onClick={toggleSignUpModal}
                                                    className='text-2xl py-5 font-manrope text-white
                                                    hover:text-apricot duration-150'
                                                >
                                                    Sign Up!
                                                </button>
                                            </div>

                                            {/* Login */}
                                            <div className='flex justify-center'>
                                                <button
                                                    onClick={toggleLoginModal}
                                                    id='loginButton'
                                                    className='text-2xl py-5 font-manrope text-white
                                                    hover:text-apricot duration-150'
                                                >
                                                    Login
                                                </button>
                                            </div>

                                            {/* actual modals at bottom to not conflict inside of a div */}
                                            <SignUpModal
                                                className=''
                                                signUpModal={signUpModal}
                                                setSignUpModal={setSignUpModal}
                                                toggleSignUpModal={
                                                    toggleSignUpModal
                                                }
                                            />
                                            <LoginModal
                                                className=''
                                                loginModal={loginModal}
                                                setLoginModal={setLoginModal}
                                                toggleLoginModal={
                                                    toggleLoginModal
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

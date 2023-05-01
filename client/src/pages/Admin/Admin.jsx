import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import EventCard from '../../components/EventCard';
import CreateModal from '../../components/CreateModal/CreateModal';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
// import { TbCalendarPlus } from 'react-icons/tb';
import CreateInput from '../../components/CreateModal/CreateInput';

const Admin = ({ client }) => {

    // Modal use state logic
    const [modal, setModal] = useState(false);
    function toggleModal() {
        setModal(!modal);
    }

    // defines create post mustation as a variable, array
    const [post] = useMutation(CREATE_POST);

    // --------------- EVENT VALUES AND INPUTS --------------- //

    // gives values to inputs as blank, and lets us change it with late logic
    const [values, setValues] = useState({
        username: '',
        title: '',
        description: '',
        time: '',
        location: '',
    });

    // Time useState variables for creating event
    const [postTime, setCreateTime] = useState();

    // declares all input types and gives them label, name, etc. Puts in array to map later down the code
    const inputs = [
        {
            id: 2,
            name: 'title',
            type: 'text',
            placeholder: 'Title',
            label: 'Title',
            required: true,
        },
        {
            id: 3,
            name: 'description',
            type: 'text',
            placeholder: 'Description',
            label: 'Description',
            required: true,
        },
        {
            id: 4,
            name: 'time',
            type: 'datetime-local',
            placeholder: Date(),
            label: 'Time',
            required: true,
            value: Date(),
        },

        {
            id: 6,
            name: 'location',
            type: 'text',
            placeholder: 'Location',
            label: 'Location',
            required: true,
        },
    ];

    // --------------- CREATE EVENT METHODS --------------- //

    // handle submit on click
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // changes the values based on the inputs given
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // create event
    const handleCreatePost = async () => {
        try {
            // gets token from local storage and makes it a variable if logged in, if not - null
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            // uses getProfile function from Auth to turn logged in user's info into useable data
            const userData = Auth.getProfile();

            // if we get null from token return false
            if (!token) {
                return false;
            }


            const { data } = await post({
                variables: {
                    title: values.title,
                    description: values.description,
                    location: values.location,
                    time: postTime,
                    username: userData.data.username,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    // query's logged in user's data
    const { loading, data } = useQuery(QUERY_ME);
    if (data) {
        console.log('DATA: ', data.me);
    }

    // gets token from local storage and makes it a variable if logged in, if not - null
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
        return false;
    }

    return (
        <section className='w-full  flex flex-col justify-center'>
            <div
                className=' mx-auto my-4 p-10 rounded-full max-w-[500px]  drop-shadow-lg 
            md:w-[80%]
            xl:max-w-[1000px]'
            >
                {/* TODO maybe add a background color circle to make the name pop? with some transparency maybe */}
                <h1
                    className=' text-center font-bowlby text-2xl text-pink
                xl:text-4xl xl:py-2'
                >
                    {/* Logged In Username */}
                    {data ? data.me.username : <br />}'s profile
                </h1>
            </div>

            {/* Create Modal at top */}
            <div className='z-10'>
                <CreateModal
                    source={'admin'}
                    client={client}
                    setModal={setModal}
                    modal={modal}
                />
            </div>

            {/* List of all the user's personal events */}
            <div className='mx-auto'>
                {/* if user has events, show this */}
                {data ? (
                    // takes user's posts and maps them
                    data.me.posts.map((post) => {
                        return (
                            // passing all the props needed
                            <EventCard
                                title={post.title}
                                description={post.description}
                                username={post.username}
                                location={post.location}
                                time={post.time}
                                comments={post.comments}
                                postId={post._id}
                                source={'admin'}
                                client={client}
                                buddies={post.buddies}
                                buddylist={post.buddylist}
                            />
                        );
                    })
                    // if user doesn't have events show this (nothing)
                ) : (
                    <br />
                )}
            </div>


            {/* FUTURE DEVELOPMENT - Create modal button at bottom of list*/}


            {/* <div
                className='flex justify-end pr-4
          max-w-[600px]
          md:w-[80%] md:pr-0
          xl:max-w-[1000px]'
            > */}

            {/* <TbCalendarPlus
                    className='text-6xl text-hotpink mr-left bg-darkblue rounded-lg p-1  drop-shadow-lg md:right-0'
                    onClick={() => {
                        handleCreatePost();
                        toggleModal();
                    }}
                /> */}
            {/* </div> */}
            {/* {modal && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center w-full'
                >
                    <div className='overlay'>
                        <div
                            className='modal-content bg-orange border-hotred border-2 rounded-lg p-4 drop-shadow-xl w-[300px] 
                    sm:w-[400px]
                    xl:w-[800px]'
                        >
                            <div className='xl:py-8'>
                                <h1
                                    className='text-center p-5 font-titan bg-orange text-maroon text-2xl
                                                xl:text-4xl'
                                >
                                    Create a new event!
                                </h1>
                                <form className='' onSubmit={handleSubmit}>
                                    {inputs.map((input) => (
                                        <CreateInput
                                            key={input.id}
                                            {...input}
                                            value={values[input.value]}
                                            onChange={onChange}
                                            setCreateTime={setCreateTime}
                                        />
                                    ))}
                                    <div className='flex flex-row justify-center'>
                                        <button
                                            className='mt-4 mx-auto text-center rounded-lg  bg-orange text-navnametext font-bowlby text-hotpink  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                                                           xl:text-2xl'
                                            onClick={() => {
                                                handleCreatePost();
                                                toggleModal();
                                            }}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className='close-modal mt-4 mx-auto text-center rounded-lg bg-hotpink text-navnametext font-bowlby text-hotpink  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                                                       xl:text-2xl'
                                            onClick={toggleModal}
                                        >
                                            CLOSE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </section>
    );
};
export default Admin;

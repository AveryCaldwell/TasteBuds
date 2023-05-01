import React, { useState } from 'react';
import EditInput from './EditInput';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_ME, QUERY_POSTS } from '../../utils/queries';

const EditModal = ({
    client,
    source,
    title,
    description,
    time,
    location,
    postId,
    buddies,
    buddylist,
}) => {
    const [modal, setModal] = useState(false);
    const [post] = useMutation(UPDATE_POST);
    const toggleModal = () => {
        setModal(!modal);
    };

    // --------------- EVENT VALUES AND INPUTS --------------- //
    function toDateTime(secs) {
        var t = new Date(parseInt(secs)); // Epoch
        return t.toISOString();
    }
    const [updateValues, setUpdateValues] = useState({
        title: title,
        description: description,
        location: location,
        buddies: buddies,
    });
    const [updateTime, setUpdateTime] = useState(toDateTime(time));
    const inputs = [
        {
            id: 2,
            name: 'title',
            type: 'text',
            placeholder: title,
            label: 'Title',
            required: true,
            value: title,
        },
        {
            id: 3,
            name: 'description',
            type: 'text',
            placeholder: description,
            label: 'Description',
            required: true,
            value: description,
        },
        {
            id: 4,
            name: 'time',
            type: 'datetime-local',
            placeholder: toDateTime(time),
            label: 'Time',
            required: true,
            value: toDateTime(time),
            defaultValue: toDateTime(time),
        },

        {
            id: 6,
            name: 'location',
            type: 'text',
            placeholder: location,
            label: 'Location',
            value: location,
        },
        {
            id: 7,
            name: 'buddies',
            type: 'number',
            placeholder: buddies,
            label: 'Reservation Size',
            value: buddies,
        },
    ];

    // --------------- CREATE EVENT METHODS --------------- //

    // handle submit on click
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // changes the values based on the inputs given
    const onChange = (e) => {
        setUpdateValues({ ...updateValues, [e.target.name]: e.target.value });
    };

    // Update event
    const handleUpdatePost = async () => {
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
                    postId: postId,
                    title: updateValues.title,
                    description: updateValues.description,
                    location: updateValues.location,
                    time: updateTime,
                    username: userData.data.username,
                    buddies: parseInt(updateValues.buddies),
                },
            });

            if (source === 'admin') {
                await client.refetchQueries({ include: [QUERY_ME] });
                toggleModal();
            } else if (source === 'listing') {
                await client.refetchQueries({ include: [QUERY_POSTS] });
                toggleModal();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='flex w-full '>

            {/* Modal toggle */}
            <button
                onClick={toggleModal}
                style={{
                    width: '150px',
                }}
                className='mt-4 text-center rounded-lg bg-pink text-navnametext font-bowlby text-cream    max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
            >
                Edit Post
            </button>

            {/* Modal */}
            {modal && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center w-full'
                >
                    <div className='overlay'>
                        <div
                            className='modal-content bg-apricot bg-opacity-80 border-darkest border-2 rounded-lg p-4 drop-shadow-xl w-[300px] 
                    sm:w-[400px]
                    xl:w-[800px]'
                        >
                            <div className='xl:py-8'>
                                <h1
                                    className='text-center font-titan text-hotred text-2xl
                                                xl:text-4xl'
                                >
                                    Edit Post!
                                </h1>

                                {/* Input form that maps out inputs to create input component */}
                                <form className='' onSubmit={handleSubmit}>
                                    {inputs.map((input) => (
                                        <EditInput
                                            key={input.id}
                                            {...input}
                                            value={updateValues[input.value]}
                                            onChange={onChange}
                                            setUpdateTime={setUpdateTime}
                                        />
                                    ))}
                                    <div className='flex flex-row justify-center'>

                                        {/* Submit button */}
                                        <button
                                            className='mt-4 mx-auto text-center rounded-lg bg-orange text-navnametext font-bowlby text-hotred  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                                                           xl:text-2xl'
                                            onClick={() => handleUpdatePost()}
                                        >
                                            Submit
                                        </button>

                                         {/* Close button */}
                                        <button
                                            className='close-modal mt-4 mx-auto text-center rounded-lg bg-orange text-navnametext font-bowlby text-hotred  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
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
            )}
        </div>
    );
};

export default EditModal;

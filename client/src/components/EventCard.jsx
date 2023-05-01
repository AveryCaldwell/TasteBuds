import React, { useState } from 'react';
import CommentInput from './CommentInput/CommentInput';
import CommentCard from './CommentCard';
import EditModal from './EditModal/EditModal';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT, DELETE_POST, UPDATE_POST } from '../utils/mutations';
import { QUERY_ME, QUERY_POSTS } from '../utils/queries';

// ------------ CARD FOR SINGLE EVENT ------------ //

// Lets other user's join the event
const JoinEvent = ({
    client,
    buddies,
    buddylist,
    postId,
    source,
    username,
}) => {

    // Update event query
    const [post] = useMutation(UPDATE_POST);

    // join event handler
    const handleJoinEvent = async () => {
        try {
            // gets token from local storage and makes it a variable if logged in, if not - null
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            // uses getProfile function from Auth to turn logged in user's info into useable data
            const userData = Auth.getProfile();

            if (!token) {
                return false;
            }

            // defines buddly list as an array
            const buddylistUpdate = [...buddylist];
            // adds username to the buddly list
            buddylistUpdate.push(userData.data.username);
            const { data } = await post({
                variables: {
                    postId: postId,
                    buddylist: buddylistUpdate,
                },
            });

            // refreshes components so new info shows
            if (source === 'admin') {
                await client.refetchQueries({ include: [QUERY_ME] });
            } else if (source === 'listing') {
                await client.refetchQueries({ include: [QUERY_POSTS] });
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Unjoin event
    const handleUnJoinEvent = async () => {
        try {
            // uses getProfile function from Auth to turn logged in user's info into useable data
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            // uses getProfile function from Auth to turn logged in user's info into useable data
            const userData = Auth.getProfile();

            // if we get null from token return false
            if (!token) {
                return false;
            }

            // defines buddly list as an array
            let buddylistUpdate = [...buddylist];

            // makes index of buddylistarray and cuts out the username of last joined
            let index = buddylistUpdate.indexOf(userData.data.username);
            buddylistUpdate = buddylistUpdate.splice(index - 1, 1);

            // updates the data
            const { data } = await post({
                variables: {
                    postId: postId,
                    buddylist: buddylistUpdate,
                },
            });

            // updates the components with the new data (the name taken off)
            if (source === 'admin') {
                await client.refetchQueries({ include: [QUERY_ME] });
            } else if (source === 'listing') {
                await client.refetchQueries({ include: [QUERY_POSTS] });
            }
        } catch (err) {
            console.error(err);
        }
    };

    let maxDisabled = false;

    // gets token from local storage and makes it a variable if logged in, if not - null
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // uses getProfile function from Auth to turn logged in user's info into useable data
    const userData = Auth.getProfile();

    if (!token) {
        return false;
    }
    if (username === userData.data.username) {
        maxDisabled = true;
    }
    if (buddylist.length >= buddies) {
        if (buddylist.indexOf(userData.data.username) === -1) {
            maxDisabled = true;
        }
        return (
            <div
                style={{
                    display: 'flex',
                }}
            >
                <button
                    disabled={maxDisabled}
                    className='mt-4 text-center rounded-full bg-orange text-navnametext font-bowlby text-cream  w-[40%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                    onClick={handleUnJoinEvent}
                >
                    Full!
                </button>
                {buddylist.map((icon) => (
                    <p style={{ fontSize: '50px', color: '#FDF7F7' }}>
                        &#9787;
                    </p>
                ))}
            </div>
        );
    } else if (buddylist.indexOf(userData.data.username) !== -1) {
        return (
            <div
                style={{
                    display: 'flex',
                }}
            >
                <button
                    disabled={maxDisabled}
                    className='mt-4 text-center rounded-full bg-orange text-navnametext font-bowlby text-lightpink  w-[40%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                    onClick={handleUnJoinEvent}
                >
                    Joined!
                </button>
                {buddylist.map((icon) => (
                    <p style={{ fontSize: '50px', color: '#FDF7F7' }}>
                        &#9787;
                    </p>
                ))}
            </div>
        );
    } else if (buddylist.indexOf(userData.data.username) === -1) {
        return (
            <div
                style={{
                    display: 'flex',
                }}
            >
                <button
                    disabled={maxDisabled}
                    className='mt-4 text-center rounded-full bg-pink text-navnametext font-bowlby text-cream  w-[40%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                    onClick={handleJoinEvent}
                >
                    Join!
                </button>
                {buddylist.map((icon) => (
                    <p style={{ fontSize: '50px', color: '#FDF7F7' }}>
                        &#9787;
                    </p>
                ))}
            </div>
        );
    }
};


const EventCard = ({
    title,
    description,
    username,
    location,
    time,
    comments,
    postId,
    source,
    client,
    buddies,
    buddylist,
}) => {

    // --------------- COMMENT VALUES AND INPUTS --------------- //

    // defines create comment mutation as a variable, array
    const [comment] = useMutation(CREATE_COMMENT);

    // gives values to inputs as blank, and lets us change it with late logic
    const [values, setValues] = useState({
        username: '',
        commentText: '',
    });

    // turns logged in user's data into a useable variable
    const userData = Auth.getProfile();

    // declares all input types and gives them label, name, etc. Puts in array to map later down the code
    const inputs = [
        {
            id: 2,
            name: 'commentText',
            type: 'text',
            placeholder: 'Comment',
            label: 'Comment',
            required: true,
        },
    ];

    // --------------- SIGN UP METHODS --------------- //

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    // ADD COMMENT
    const addComment = async () => {
        try {

            // gets token from local storage and makes it a variable if logged in, if not - null
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false;
            }

            // uses getProfile function from Auth to turn logged in user's info into useable data
            const userData = Auth.getProfile();

            const { data } = await comment({
                variables: {
                    postId: postId,
                    commentText: values.commentText,
                    username: userData.data.username,
                },
            });

            //   refreshes components/pages with the new data
            if (source === 'admin') {
                await client.refetchQueries({ include: [QUERY_ME] });
            } else if (source === 'listing') {

                await client.refetchQueries({ include: [QUERY_POSTS] });
            }
        } catch (err) {
            console.error(err);
        }
    };

    // changes the values with new inputs
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

//    delete post query mutator
    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [{ query: QUERY_ME }],
    });

    // handles datetime to work with method
    function toDateTime(secs) {
        var t = new Date(parseInt(secs)); // Epoch
        return t.toLocaleString();
    }

     // DELETE POST
    const handleDelete = async (postId) => {
        // console.log(postId);
        if (!postId) {
            console.log('postId is undefined');
            return;
        }

        deletePost({ variables: { postId: postId.toString() } });
        if (source === 'admin') {
            await client.refetchQueries({ include: [QUERY_ME] });
        } else if (source === 'listing') {
            console.log('made it');
            await client.refetchQueries({ include: [QUERY_POSTS] });
        }
    };

    return (
        <div
            className='flex flex-col items-center drop-shadow-lg w-full bg-apricot mt-10 my-4 rounded 
       
        lg:max-w-[900px]
        xl:max-w-[1100px]'
        >
            {/* ------------  TABLETS AND UP ------------ */}
            <div
                className='hidden w-[90%] sm:flex flex-col font-manrope p-4 
                sm:w-full 
                md:max-w-[600px] md:rounded-3xl md:m-4
                lg:max-w-[800px]
                xl:max-w-[1000px]'
            >
                <div className='bg-cream bg-opacity-90  rounded-lg p-5 drop-shadow-lg'>
                    <h1
                        className='text-lg font-bold text-hotred p-5
                        lg:text-xl
                        xl:text-2xl'
                    >
                        {title}
                    </h1>
                    <div className='w-[90%] flex flex-col mx-auto'>
                        <p
                            className='text-[10px] text-pink
                        lg:text-sm
                        xl:text-base'
                        >
                            Created by {username}
                        </p>
                        <p
                            className='w-full mx-auto py-2 text-sm text-hotred 
                        lg:text-lg lg:py-4
                        xl:text-xl'
                        >
                            {description}
                        </p>
                        <p
                            className='text-right text-[10px] text-coral
                        lg:text-sm
                        xl:text-base'
                        >
                            Reservation for {buddies}
                        </p>
                    </div>
                    <p
                        className='text-right text-[10px] text-coral
                          lg:text-sm
                          xl:text-base'
                    >
                        {location}
                    </p>
                    <p
                        className='text-right text-[10px] text-coral
                          lg:text-sm
                          xl:text-base'
                    >
                        {toDateTime(time)}
                    </p>
                </div>
                <JoinEvent
                    postId={postId}
                    client={client}
                    buddies={buddies}
                    buddylist={buddylist}
                    source={source}
                    username={username}
                />

                {/* ------------  COMMENT INPUT  ------------ */}

                <form className='' onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <CommentInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    {/* ---------------ADD COMMENT BUTTON ------------ */}
                    <div className='hidden sm:flex flex-row justify-between '>
                        {/* TODO: edit padding under comment text area to make button closer to text box */}
                        <button
                            className=' text-center rounded-lg bg-pink text-navnametext font-bowlby text-cream  w-[40%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                            onClick={() => addComment()}
                        >
                            Comment
                        </button>

                        {/* FUTURE DEVELOPMENT - LIKE BUTTON */}
                        
                        {/* <div className='flex flex-row items-center justify-center gap-2 mt-4 ml-4 w-[22.5%] rounded bg-darkblue py-1 drop-shadow-md'>
                            <FaCheckSquare
                                className=' text-hotpink'
                                size={30}
                            />
                            <p className='text-2xl font-titan  px-2 rounded text-borderblue'>
                                3
                            </p>
                        </div> */}
                    </div>
                </form>

                {/* ------------ LIST OF COMMENTS  ------------ */}

                <div className='hidden sm:m-4 sm:flex flex-col items-center'>
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} {...comment} />
                    ))}
                </div>

                {/* -----------DELETE/EDIT POST BUTTON -----------*/}
                <div className='flex flex-row items-center justify-between'>
                    {userData.data.username === username ? (
                        <button
                            className='mt-4 mtext-center rounded-lg bg-pink text-navnametext font-bowlby text-cream  w-[40%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                            onClick={() => handleDelete(postId)}
                        >
                            Delete Post
                        </button>
                    ) : (
                        <br />
                    )}

                    {/* -----------UPDATE POST BUTTON ----------- */}
                    {/* TODO: fix edit button styling */}
                    <div className='flex flex-row items-center justify-between'>
                        {userData.data.username === username ? (
                            <EditModal
                                title={title}
                                description={description}
                                time={time}
                                location={location}
                                postId={postId}
                                client={client}
                                source={source}
                                buddies={buddies}
                                buddylist={buddylist}
                            />
                        ) : (
                            <br />
                        )}
                    </div>
                </div>
            </div>

            {/* ------------  MOBILE ------------ */}
            {/* FIXME - match desktop styling */}
            <div className='flex flex-col mx-auto'>
                {/* <div className='flex flex-row'> */}
                <div className='w-[90%] flex sm:hidden flex-col font-manrope p-4 mx-auto'>
                    <div className='bg-orange text-pink rounded-lg p-3'>
                        <h1
                            className='text-lg font-bold text-darkest 
                           lg:text-xl
                           xl:text-3xl'
                        >
                            {title}
                        </h1>
                        <div className='w-[90%] flex flex-col mx-auto'>
                            <p
                                className='text-[10px] text-maroon
                          lg:text-sm
                          xl:text-lg'
                            >
                                Created by {username}
                            </p>
                            <p
                                className='w-full mx-auto py-2 text-sm text-darkest
                          lg:text-lg lg:py-4
                          xl:text-2xl'
                            >
                                {description}
                            </p>
                            <p
                                className='text-right text-[10px] text-maroon
                        lg:text-sm
                        xl:text-base'
                            >
                                Reservation for {buddies}
                            </p>
                            <p
                                className='text-right text-[10px] text-maroon
                          lg:text-sm
                          xl:text-lg'
                            >
                                {location}
                            </p>
                            <p
                                className='text-right text-[10px] text-maroon
                          lg:text-sm
                          xl:text-lg'
                            >
                                {time}
                            </p>
                        </div>
                    </div>
                    <JoinEvent
                        postId={postId}
                        client={client}
                        buddies={buddies}
                        buddylist={buddylist}
                        source={source}
                        username={username}
                    />
                </div>
                <div className='flex mx-4 sm:hidden flex-row justify-between my-2'>
                    <button
                        className='mt-4 text-center rounded-lg bg-pink text-navnametext font-bowlby text-cream  w-[40%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                        onClick={() => handleDelete(postId)}
                    >
                        Delete post
                    </button>
                </div>
            </div>
            {/* </div> */}

            {/* COMMENT AREA */}
            <div className='w-[90%] flex sm:hidden flex-col font-manrope p-4'>
                <form className='w-[100%]' onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <CommentInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <div className='flex flex-row justify-center'>
                        <button
                            className='mt-4 mx-auto text-center rounded-lg bg-pink text-navnametext font-bowlby text-cream  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                       xl:text-2xl'
                            type='submit'
                            onClick={() => addComment()}
                        >
                            Submit
                        </button>
                        <button
                            className='close-modal mt-4 mx-auto text-center rounded-lg bg-pink text-navnametext font-bowlby text-cream  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
                   xl:text-2xl'
                        >
                            CLOSE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventCard;

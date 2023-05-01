import React from 'react';
import CreateModal from '../../components/CreateModal/CreateModal';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import EventCard from '../../components/EventCard';

function Listings({ client }) {
    const { loading, data } = useQuery(QUERY_POSTS);
    let postData = data?.getAllPosts || [];
    const userData = Auth.getProfile();
    console.log(postData, 'postData');
    if (loading) {
        return <h2>LOADING</h2>;
    }
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
        return false;
    }

    return (
        <section className='m-4 mx-auto w-full flex flex-col justify-center'>
            <h1
                // TODO: add max width
                className='text-center p-5  my-4 mt-10 mb-10 text-pink font-bowlby  text-lg 
                xl:text-4xl xl:py-2 m-4 '
            >
                Welcome {data ? userData.data.username : 'Foodie'}!
            </h1>
            <div className='z-10'>
                <CreateModal source={'listing'} client={client} />
            </div>
            <div className='sm:m-4 mx-auto flex flex-col items-center'>
                {data ? (
                    data.getAllPosts.map((post) => (
                        <EventCard
                            postId={post._id}
                            client={client}
                            source='listing'
                            buddies={post.buddies}
                            buddylist={post.buddylist}
                            {...post}
                        />
                    ))
                ) : (
                    <br />
                )}


            </div>
        </section>
    );
}

export default Listings;

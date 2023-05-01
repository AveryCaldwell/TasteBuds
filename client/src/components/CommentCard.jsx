import React from 'react';

import { DELETE_COMMENT } from '../utils/mutations';

import { useMutation } from '@apollo/client';

const CommentCard = ({
    username,
    commentText,
    source,
    client,
    postId,
    commentId,
}) => {

    //  FUTURE DEVELOPMENT -- DELETE COMMENT BUTTON
    // const [comment] = useMutation(DELETE_COMMENT);
    // const deleteComment = async () => {};


    return (
        <div className='flex flex-col w-full m-4 bg-lightpink bg-opacity-50 drop-shadow-lg rounded p-4 font-manrope '>
            <p
                className='text-left text-cream w-full py-2 text-base 
                          lg:text-lg lg:py-1
                          xl:text-xl'
            >
                "{commentText}"
            </p>
            {/* TODO: Make username a link to users profile */}
            <div className='flex flex-row items-center justify-between'>
                <p
                    className='text-left pl-3 text-sm text-cream
                          lg:text-base
                          xl:text-lg'
                >
                    - {username}
                </p>

                {/* FUTURE DEVELOPMENT -- DELETE COMMENT BUTTON */}
                {/* <button
                    className='mt-4 text-center rounded-lg bg-darkblue text-navnametext font-bowlby text-hotpink  w-[30%]  max-w-[180px] p-2 drop-shadow-md
                       sm:w-[25%]
                       xl:text-2xl'
                    onClick={() => deleteComment()}
                >
                    Delete Comment
                </button> */}
            </div>
        </div>
    );
};

export default CommentCard;

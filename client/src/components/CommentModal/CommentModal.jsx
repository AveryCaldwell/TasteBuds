// ------------FUTURE DEVELOPMENT------------

// import React, { useState } from 'react';
// import CommentInput from '../CommentInput/CommentInput';
// import { FaCommentAlt } from 'react-icons/fa';
// import { comments } from '../../constants/constants';
// import CommentCard from '../CommentCard';

// const CommentModal = () => {
//     const [modal, setModal] = useState(false);

//     const toggleModal = () => {
//         setModal(!modal);
//     };

//     // --------------- COMMENT VALUES AND INPUTS --------------- //
//     const [values, setValues] = useState({
//         username: '',
//         commentText: '',
//     });

//     const commentInputs = [
//         {
//             id: 1,
//             name: 'username',
//             type: 'text',
//             placeholder: 'Username',
//             label: 'Username',
//             required: true,
//         },
//         {
//             id: 2,
//             name: 'commentText',
//             type: 'text',
//             placeholder: 'Comment',
//             label: 'Comment',
//             required: true,
//         },
//     ];

//     // --------------- SIGN UP METHODS --------------- //

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };

//     const onChange = (e) => {
//         console.log(e.target.value);
//         setValues({ ...values, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className='flex flex-col items-center  py-4'>
//             <button
//                 onClick={toggleModal}
//                 className='
//                      drop-shadow-md
//                      mt-4 mx-auto text-2xl rounded-2xl'
//             >
//                 <div className='flex flex-col items-center py-4'>
//                     <FaCommentAlt className='text-orange' size={27} />
//                     {/* TODO: THIS NEEDS TO SWITCH TO {comment.count} IF WE DO THIS */}
//                     <p className='text-xs text-cream'>3</p>
//                 </div>
//             </button>

//             {modal && (
//                 <div
//                     className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
//                 flex justify-center items-center w-screen h-screen z-10'
//                 >
//                     <div onClick={toggleModal} className='overlay'>
//                         <div
//                             className='modal-content bg-card  rounded-lg p-4 drop-shadow-xl w-full 
//                     sm:w-[400px]
//                     xl:w-[800px]'
//                         >
//                             <div className='xl:py-8'>
//                                 <h1
//                                     className='text-center font-titan text-blue text-2xl
//                                                 xl:text-4xl'
//                                 >
//                                     {/* TODO: Link title to title of post that was clicked on */}
//                                     TITLE
//                                 </h1>
//                                 <div className='m:hidden sm:m-4 flex flex-col items-center'>
//                                     {comments.map((comment) => (
//                                         <CommentCard
//                                             key={comment.id}
//                                             {...comment}
//                                         />
//                                     ))}
//                                 </div>

//                                 {/* ------------  COMMENT INPUT  ------------ */}

//                                 <form className='' onSubmit={handleSubmit}>
//                                     {commentInputs.map((commentInput) => (
//                                         <CommentInput
//                                             key={commentInput.id}
//                                             {...commentInput}
//                                             value={values[commentInput.name]}
//                                             onChange={onChange}
//                                         />
//                                     ))}
//                                     <div className='flex flex-row justify-center'>
//                                         <button
//                                             className='mt-4 mx-auto text-center rounded-lg bg-navbg text-navnametext font-bowlby text-blue  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
//                                                            xl:text-2xl'
//                                         >
//                                             Submit
//                                         </button>
//                                         <button
//                                             className='close-modal mt-4 mx-auto text-center rounded-lg bg-navbg text-navnametext font-bowlby text-blue  w-[40%] sm:w-[25%] max-w-[180px] p-2 drop-shadow-md
//                                                        xl:text-2xl'
//                                             onClick={toggleModal}
//                                         >
//                                             CLOSE
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CommentModal;

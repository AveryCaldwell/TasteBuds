// FUTURE DEVELOPMENT -- Edit user profile

// import { useContext, useEffect, useRef, useState } from "react"
// import { Link, useParams } from "react-router-dom"
// import { editUserData, editUserBio, getUser } from "./EditProfile"
// // const { AuthService } = require('../utils/auth');


// const User = () => {
//   const params = useParams()
//   const userId = params.id
//   // const { auth, setAuth } = useContext()//need Auth
//   const { auth, setAuth } = useContext()

//   const bioRef = useRef('')
//   const [errors, setErrors] = useState(false)
//   const [isOwner, setIsOwner] = useState(false)
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     bio: '',
//     })
//   const [userData, setUserData] = useState({
//     birthday: '', email: '',
//     pic: '',
//     username: '', _id: '', bio: '',
//     ownedNft: [], likedNft: [],
//     })

// useEffect(() => {
//   // FIX ME: made changes
//     // (async function getUserData() {
//       const fetchUserData = async ()=> { // Rename to fetchUserData for clarity
//       const data = await getUser(userId)
//       setUserData(data)
//       setFormData({
//         username: data.username,
//         bio: data.bio,
//         email: data.email,
//       })
//         }
//         // FIXME: made changes
//         fetchUserData()
//     }, [userId]); // Add userId as dependency

// useEffect(() => {
//   // FIX ME: updated comparison
//   // if (auth?._id === userId && isOwner === false)
//     if (auth?._id === userId && !isOwner) {
//   setIsOwner(true);
// }
//    // FIXME: made changes
//   // }, [formData])
// }, [formData, userId, auth, isOwner]);

// // FIXME: reformatted
//   async function handleUserData(e) {
//     e.preventDefault();
//     try {
//       const formDataValue = new FormData(e.target);
//       const { username, email } = Object.fromEntries(formDataValue.entries());
//       const data = await editUserData(auth._id, username, email);

//       if (data?.message) {
//         setErrors(true);
//       } else {
//         setAuth(data);
//         setErrors(false);
//       }
//       } catch (error) {
//           setErrors(true);
//       }
//     }
// // FIXME: reformatted
// async function handleUserBio(e) {
//   e.preventDefault();
//   const bioData = bioRef.current.value;
//   try {
//     const data = await editUserBio(auth._id, auth.username, bioData);
//     if (data?.message) {
//       setErrors(true);
//      } else {
//       setAuth(data);
//      }
//     } catch (error) {
//         setErrors(true);
//     }
//     }
  

//     return (
//       <div className="container emp-profile">
//         <form method="POST" onSubmit={handleUserData}>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="profile-img">
//                 <a href={userData.pic}>
//                   <img className="profile-pic" src={userData.pic} alt='not-found' />
//                 </a>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="profile-head">
//                 <h5>Cryptic Andy</h5>
//                 <h6>Foodie</h6>
//                   {isOwner
//                     ? <textarea
//                     ref={bioRef}
//                     className="profile-bio mt-3 mb-5 bio-textarea"
//                     defaultValue={userData.bio}>
//                     </textarea>
//                     : <p className="profile-bio mt-3 mb-5 ">
//                       ~ " {userData?.bio?.slice(0, 230)} " ~
//                       </p>
//                   }
//           <div className="info-grid">
//             <p className="following-data">
//               Following: {}
//             </p>
//             <p className="followers-data">
//               Followers: {}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="col-md-2">
//         {isOwner ?
//         <>
//         <Link to={"/profile/" + userData._id + "/select-profile-picture"} className="select-pic-btn"> Select Profile Picture </Link>
//           <button className="edit-bio-btn" onClick={handleUserBio} >
//             Edit Bio
//           </button>
//         </>
//         : null
//        }
//       </div>
//       </div>

//       <div className="row">
//         <div className="col-md-8 pl-5 about-info ">
//           <div className="tab-content profile-tab" id="myTabContent">
//             <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
//               <div className="grid-box">
//             <div>
//             </div>
//           <div className="profile-error-container">
//             <span className="profile-error">
//               {errors}
//             </span>
//           </div>
//           <div className="aligner label-data">
//             <label>Username :</label>
//           </div>

//           <div className="aligner">
//             {isOwner
//               ? <>
//               <input
//                 type="text"
//                 className="user-data"
//                 defaultValue={userData.username}
//                 placeholder="Please fill field!"
//                 name='username'
//               />
//             <button className="confirm-button" type="submit">✓</button>
//             </>
//               :
//             <input
//               disabled
//               className="user-data"
//               defaultValue={userData.username}
//               placeholder="Please fill field!"
//             />
//           }
//             </div>
//           </div>
//         <div className="grid-box">
//           <div className="aligner label-data">
//             {errors
//               ? <span className="profile-error">Invalid username! </span>
//               : null
//             }
//             <label>E-mail :</label>
//           </div>

//           <div className="aligner">
//             {isOwner
//               ? <>
//               <input

//                 type="text"
//                 className="user-data"
//                 defaultValue={userData.email}
//                 placeholder="Please fill field!"
//                 name="email" />
//                   <button className="confirm-button" type="submit">✓</button>
//               </>
//               : <>
//               <input
//                 disabled
//                 className="user-data"
//                 defaultValue={userData.email}
//                 placeholder="Please fill field!" />
//               </>}
//           </div>
//         </div>

//         <div className="grid-box" >
//           <div className="aligner label-data">
//             <label>Birthday :</label>
//           </div>
//           <div className="aligner ">
//             <p className="user-text">{userData.birthday}</p>
//           </div>
//         </div>
//     </div>
//     </div>
//     </div>
//   </div>
//   </form>
// </div>
//     )
// }

// export default User
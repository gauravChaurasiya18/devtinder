import React, { cache, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [showtoast, setShowToast] = useState(false);
    const dispatch = useDispatch();


    const saveProfile = async () => {
        setError("");


        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                about,
                photoUrl,
                gender,
            }, {

                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
            );
            console.log(res?.data?.data);
            console.log("Response from server:", res.data);

            dispatch(addUser(res?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        } catch (err) {
            console.error("Error" + err);
            setError(err.response);
        }
    }
    return (
        <>
            <div className='flex  justify-center  my-10 '>

                <div className=" mx-10" >
                    <div className="card card-border bg-base-300 w-96 ">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">FirstName </legend>
                                    <input type="text"
                                        value={firstName}
                                        className="input"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter Your Email" />

                                </fieldset>

                            </div>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">LastName</legend>
                                    <input type="text"
                                        value={lastName}
                                        className="input"
                                        placeholder="Enter Your Password"
                                        onChange={(e) => setlastName(e.target.value)}
                                    />

                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input type="text"
                                        value={age}
                                        className="input"
                                        placeholder="Enter Your Password"
                                        onChange={(e) => setAge(e.target.value)}
                                    />

                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input type="text"
                                        value={gender}
                                        className="input"
                                        placeholder="Enter Your Password"
                                        onChange={(e) => setGender(e.target.value)}
                                    />

                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About</legend>
                                    <input type="text"
                                        value={about}
                                        className="input"
                                        placeholder="Enter Your Password"
                                        onChange={(e) => setAbout(e.target.value)}
                                    />

                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">PhotoUrl</legend>
                                    <input type="text"
                                        value={photoUrl}
                                        className="input"
                                        placeholder="Enter Your Password"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />

                                </fieldset>
                            </div>

                            <p className='text-red-600'>{error}</p>
                            <div className="card-actions justify-center my-4">
                                <button className="btn btn-primary " onClick={saveProfile}
                                >Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
            </div>
            {showtoast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span> Profile Updated Successfully  </span>
                </div>
            </div>)}

        </>
    )
}

export default EditProfile
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';
const UserCard = ({ user }) => {
    // console.log(user);
    const dispatch = useDispatch();
    const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
    const handleSendRequest = async (status, userId) => {

        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }


            );



            dispatch(removeFeed(userId));
        } catch (err) {
            console.error("🚨 API Request Failed:", err.message);
        }

    }
    return (
        <div className='flex justify-center items-center '>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="User Photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + '  ' + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-between my-4">
                        <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore </button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;
import React from 'react';
const RequestCard = ({ user, reviewRequest }) => {
    return (
        <div key={user._id} className="flex justify-center items-center my-4">
            <div className="card card-side bg-base-300 flex justify-center items-center shadow-sm max-w-xl">
                <figure>
                    <img
                        src={user.fromUserId.photoUrl}
                        alt="Profile"
                        className="rounded-full w-20 h-20 ml-2"
                    />
                </figure>
                <div className="card-body ">
                    <h2 className="card-title">{user.fromUserId.firstName + " " + user.fromUserId.lastName}</h2>
                    <p className="w-[200px] max-w-sm break-words">
                        {user.fromUserId.about.split(" ").slice(0, 10).join(" ") + (user.fromUserId.about.split(" ").length > 10 ? "..." : "")}
                    </p>
                </div>
                <div className=''>
                    <button className="btn btn-primary mx-4" onClick={() => reviewRequest("accepted", user._id)}>Accept</button>
                    <button className="btn btn-secondary mr-2" onClick={() => reviewRequest("rejected", user._id)}>Reject</button>
                </div>
            </div>
        </div>
    )
}

export default RequestCard
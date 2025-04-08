import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import RequestCard from './RequestCard';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);


    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            dispatch(addRequests(res.data.connectionRequests));
        } catch (err) {
            console.error("🚨 Fetch Requests Failed:", err.message);
        }
    };


    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            console.log("✅ Request Reviewed:", res.data);
            // Refresh the requests list
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error("🚨 API Request Failed:", err.message);
        }
    };

    useEffect(() => {
        fetchRequests(); // Fetch requests on component mount
    }, []);

    if (!requests) return null;

    if (requests.length === 0) return <h1 className='font-bold text-2xl flex justify-center items-center'> No Request found</h1>;

    return (
        <div className="p-4">
            <h1 className='flex justify-center items-center font-bold my-2'>Connections</h1>
            <div>
                {requests.map((resdata) => (
                    <RequestCard key={resdata._id} user={resdata} reviewRequest={reviewRequest} />
                ))}
            </div>
        </div>
    );
};

export default Requests;

import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    console.log(feed);
    const getfeed = async () => {
        if (feed)
            return;
        try {
            const res = await axios.get(
                BASE_URL + "/feed", { withCredentials: true })
            dispatch(addFeed(res?.data));
        }
        catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        getfeed();
    }, []);

    if (!feed) return;

    if (feed.length <= 0) {
        return (
            <h1 className='flex text-2xl font-bold justify-center items-center my-10'>No More Users </h1>
        )
    }

    return (


        feed && (
            <div className="flex flex-col items-center gap-4 my-5">
                {feed && <UserCard user={feed[0]} />}

            </div>
        )
    );
};
export default Feed;
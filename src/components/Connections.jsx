import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import ConnectionCard from './ConnectionCard'

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        console.log("Connections component mounted");
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true,
            });

            console.log("✅ Full API Response:", res);
            console.log("✅ Data from API:", res.data);
            console.log("✅ Extracted connections:", res.data.data);
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error("🚨 API Request Failed:", err.message);

        }

    }
    useEffect(() => {
        fetchConnections();

    }, []);

    if (!connections) return;

    if (connections.length === 0) return (<h1 className='font-bold text-2xl'> No Connections</h1>)

    return (
        <div className>

            <h1 className='flex justify-center items-center font-bold my-2'>Connections </h1>
            <div >
                {connections.map((connection) => (
                    <ConnectionCard user={connection} />
                ))}

            </div>


        </div>

    )
}

export default Connections
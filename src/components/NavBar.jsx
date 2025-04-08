import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import axios from 'axios';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log(user);
    try {
      const res = await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      })
      dispatch(removeUser());
      return navigate("/login");

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div><div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      {user && (<div className="flex-none gap-2 flex ">
        <div className='form-control my-4 font-bold'>Welcome  {user.firstName}</div>
        <div className="dropdown dropdown-end mx-5 ">

          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile/edit" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Request</Link></li>
            <li><a onClick={handleLogOut}>Logout</a></li>
          </ul>
        </div>
      </div>)}
    </div>
    </div>
  )
}

export default NavBar
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const [emailId, setEmailId] = useState("gaurav182005@gmail.com");
  const [password, setPassword] = useState("Gaurav@123");
  const [error, setError] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,

      }, {
        withCredentials: true,
      })
      dispatch(addUser(res.data.data));
      return (navigate('/profile/edit'));
    } catch (err) {
      setError(error?.response?.message || "Invalid Credential")
      console.error(error?.response?.message || "Invalid Credential");
    }
  }
  const handlelogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login", {
        emailId,
        password,
      },
        {
          withCredentials: true
        });

      dispatch(addUser(res.data))
      return navigate("/");
    } catch (err) {
      setError(error?.response?.message || "Invalid Credential")
      console.error(error?.response?.message || "Invalid Credential");
    }
  }
  return (
    <div className="flex justify-center my-20" >
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id </legend>
              <input type="text"
                value={emailId}
                className="input"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter Your Email" />

            </fieldset>

          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text"
                value={password}
                className="input"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />

            </fieldset>
          </div>
          {!isLoginForm && (<>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName </legend>
                <input type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="Enter Your FirstName" />

              </fieldset>

            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName </legend>
                <input type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Enter Your LastName" />

              </fieldset>

            </div>
          </>)}

          <p className='text-red-500'> {error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary"
              onClick={isLoginForm ? handlelogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className='m-auto cursor-pointer ' onClick={() => setIsLoginForm((value) => !value)}>
            {
              isLoginForm ? "New User? SignUp Here"
                : "Exitsing User? Login Here"
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
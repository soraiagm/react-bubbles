import React, { useState } from "react";
import { axiosWithAuth } from '../utilities/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

    const [data, setData ] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', data)
            .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/protected');
          })
          .catch(err => console.log(err));
      };


    return (
      <>
      <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={login}>
           <div className="username">Username</div>
            <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                value={data.username} 
                onChange={handleChange} />
            <div className="password">Password</div>
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={data.password}
                onChange={handleChange} />

            <button type="submit">Log In</button> 
        </form>
      </>
    );
}

export default Login;

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

export default function SigninPage (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";
    const dispatch = useDispatch();

    useEffect(() => {
        if(!Array.isArray(userInfo) && userInfo !== undefined){
            props.history.push(redirect); //redirect to homepage
        }
        return () => {
            //
        }
    }, [userInfo, props.history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Sign In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Sign In</button>
                </li>
                <li>
                    Sign up
                </li>
                <li>
                    <Link to={redirect === "/" ? "/register" : "register?redirect=" + redirect} className="button text-center button-secondary" >Create your account</Link>
                </li>
            </ul>
        </form>
    </div>
}

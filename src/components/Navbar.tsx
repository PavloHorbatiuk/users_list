import React from 'react';
import logo from './../images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { ReduxState } from '../store/state';
import { InitialStateType } from '../store/reducers/UsersReducers';
import { useSelector } from 'react-redux';

const NavBar = () => {
	const navigate = useNavigate();
	const { isAuth } = useSelector<ReduxState, InitialStateType>(
		(state) => state.users
	);
	const clickHandler = () => navigate('/add-user');
	return (
		<nav className="bg-wight container px-4 mx-auto lg:px-14 py-2">
			<div className="flex container justify-between">
				<img className="w-104 h-26" src={logo} alt="logo" />
				<div className="flex">
					<button className="btn bg-primary hover:bg-hover mr-2.5">
						Users
					</button>
					{!isAuth && <button onClick={clickHandler} className="btn bg-primary hover:bg-hover">Sign up</button>}	
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

import React, { useEffect } from 'react';
import NavBar from './components/Navbar';
import { Hero } from './components/Hero';
import { UsersPage } from './components/UsersPage';
import { InitialStateType, getAllUsers, getPosition } from './store/reducers/UsersReducers';
import { ReduxState, useAppDispatch } from './store/state';
import { AddUserForm } from './components/AddUserForm';
import SuccessfulPage from './components/SuccessfulPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
	const dispatch = useAppDispatch();
	const {   isAuth } = useSelector<ReduxState, InitialStateType>(
		(state) => state.users
	);
	
	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getPosition())
	}, [dispatch]);

	return (
		<div className='bg-lightGrey'>
			<Router>
				<div className='bg-lightGrey'>
					<NavBar />
					<Hero />
					<UsersPage />		
					<Routes>
						{isAuth ? (
							<Route path="/successful" element={<SuccessfulPage />} />
						) : (
							<Route path="/add-user" element={<AddUserForm />} />
						)}
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
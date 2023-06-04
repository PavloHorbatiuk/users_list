import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ReduxState } from '../store/state';
import { InitialStateType } from '../store/reducers/UsersReducers';





const Hero = () => {
	const navigate = useNavigate();
	const { isAuth } = useSelector<ReduxState, InitialStateType>(
		(state) => state.users
	);
	const clickHandler = () => navigate('/add-user');

	return (

		<div className="bg-hero-pattern mx-auto px-14 bg-cover bg-center h-screen max-h-[650px] w-full relative overflow-hidden  bg-no-repeat text-center">
			<div className="mx-auto max-w-[380px] py-32 sm:py-48 lg:py-56 text-white">
				<h1 className='font-nunito text-4xl font-normal leading-10 tracking-normal text-center mb-5'>Test assignment for front-end developer</h1>
				<p className='text-base font-normal leading-6 tracking-normal mb-9'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
				{!isAuth && <button onClick={clickHandler} className="btn bg-primary hover:bg-hover">Sign up</button>}
			</div>
		</div>
	)
}
export { Hero }
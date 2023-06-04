import React, { useEffect, useState } from 'react';
import { ReduxState } from '../store/state';
import { useSelector } from 'react-redux';
import { InitialStateType, User, getNextPage, removeOldUsers } from '../store/reducers/UsersReducers';
import { UserCard } from './UserCard';
import { useDispatch } from 'react-redux';

const UsersPage = () => {
	const dispatch = useDispatch();
	const { total_pages, users, links, page } = useSelector<ReduxState, InitialStateType>(state => state.users);

	const [filteredUsers, setFilteredUsers] = useState<User[]>([])

	useEffect(() => {
		if (users.length < 6 && links.next_url) {
			dispatch<any>(getNextPage());
		} else {
			const sortedUsers = users
				.sort((a, b) => b.registration_timestamp - a.registration_timestamp)
				.slice(0, 6);
			setFilteredUsers(sortedUsers)
		}
	}, [users, links, dispatch]);

	const isTheLastPage = page !== undefined && total_pages === page;

	const onClickHandler = () => {
		const uniqueArray = users.filter(user => !filteredUsers.includes(user)).concat(filteredUsers.filter(user => !users.includes(user)));
		dispatch<any>(removeOldUsers(uniqueArray));
		dispatch<any>(getNextPage());
	};


	return (
		<div className="container px-4 mx-auto lg:px-14 ">
			<h1 className="mt-36">Working with GET request</h1>
			<div className="pt-5    grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-7 place-items-center">
				{users.length &&
					filteredUsers.map((user, index) => {
						return (
							<div className="w-full  max-w-sm" key={index}>
								<UserCard
									id={user.id}
									name={user.name}
									email={user.email}
									phone={user.phone}
									photo={user.photo}
									position={user.position}
									position_id={user.position_id}
									registration_timestamp={user.registration_timestamp}
								/>
							</div>
						);
					})}
			</div>

			{!isTheLastPage && (
				<div className="pt-12 text-center">
					{' '}
					<button
						onClick={onClickHandler}
						className="btn bg-primary hover:bg-hover"
					>
						Show more
					</button>
				</div>
			)}
		</div>
	);
};
export { UsersPage };

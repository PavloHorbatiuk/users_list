import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../store/reducers/UsersReducers';

const UserCard: React.FC<User> = ({
	id,
	name,
	email,
	phone,
	photo,
	position,
}) => {
	const [truncatedEmail, setTruncatedEmail] = useState(email);
	const [truncatedName, setTruncatedName] = useState(name);

	const substringProps = useCallback((value: string, setValue: (value: string) => void) => {
		const maxLength = 18;
		if (value.length > maxLength) {
			setValue(value.substring(0, maxLength) + "...");
		} else {
			setValue(value);
		}
	}, []);

	useEffect(() => {
		name && substringProps(name, setTruncatedName)
		email && substringProps(email, setTruncatedEmail)
	}, [email, name, substringProps]);

	return (
		<div
			key={id}
			className="p-5   flex flex-col items-center  rounded-lg bg-white">
			<img
				className="h-16 w-16 rounded-full overflow-hidden"
				src={photo as string}
				alt="avatar"
			/>
			<h2 className="pt-5 pb-5 text-body-16">{truncatedName}</h2>
			<p className="text-body-16">{position}</p>
			<p className="text-body-16">{truncatedEmail}</p>
			<p className="text-body-16">{phone}</p>
		</div>
	);
};

export { UserCard };

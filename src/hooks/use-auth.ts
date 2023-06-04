import { useAppSelector } from '../store/state';

export function useAuth() {
	const {token} = useAppSelector(state => state.users);
	return {
	
		token,
	};
}

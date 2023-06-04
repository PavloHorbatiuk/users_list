import axios from 'axios';
import { authAPI } from '../../api/api';
import { TypedThunk } from '../state';
import { setStatusAC } from './LoaderReducer';
import { redirect } from 'react-router-dom';

enum ACTIONS_TYPE {
	SET_ALL_USERS = 'SET/ALL/USERS',
	SET_NEXT_PAGES = 'SET/NEXT/PAGE',
	REMOVE_OLD_USERS = 'REMOVE/OLD/USERS',
	SIGN_UP = 'SIGN/UP',
	GET_TOKEN = 'GET/TOKEN',
	SET_POSITION = 'SET/POSITION',
	SET_ERRORS = 'SET/ERROR',
	SET_IS_LOGIN = 'SET/IS/LOGIN',
}

export interface Links {
	next_url: string;
	prev_url: string;
}
export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	position: string;
	position_id: string[] | number;
	registration_timestamp: number;
	photo: File | '';
}

export type SignUpDataType = Pick<
	User,
	'name' | 'email' | 'photo' | 'position_id' | 'phone'
> | null;

export interface Position {
	id: number;
	name: string;
}
export type InitialStateType = {
	count: number | null;
	links: Links;
	page?: number | null;
	total_pages?: number | null;
	total_users?: number | null;
	users: User[];
	signUpData?: SignUpDataType;
	token?: string | null;
	positionToStart?: Position[];
	serverErrors?: any;
	isAuth?: boolean;
};

const initialState: InitialStateType = {
	count: null,
	links: { next_url: '', prev_url: '' },
	page: null,
	total_pages: null,
	total_users: null,
	users: [],
	signUpData: null,
	token: '',
	positionToStart: [],
	serverErrors: null,
	isAuth: false,
};
export const UsersReducers = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case ACTIONS_TYPE.SET_IS_LOGIN:
			return {
				...state,
				isAuth: action.payload,
			};
		case ACTIONS_TYPE.SET_ERRORS:
			return {
				...state,
				serverErrors: action.payload,
			};
		case ACTIONS_TYPE.SET_POSITION:
			return {
				...state,
				positionToStart: action.payload,
			};
		case ACTIONS_TYPE.GET_TOKEN:
			return {
				...state,
				...action.payload,
			};
		case ACTIONS_TYPE.SET_ALL_USERS:
			return {
				...state,
				...action.payload,
			};
		case ACTIONS_TYPE.SET_NEXT_PAGES:
			return {
				...state,
				...action.payload,
			};
		case ACTIONS_TYPE.REMOVE_OLD_USERS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};

export const isSuccessfulAC = (data: boolean) =>
	({ type: ACTIONS_TYPE.SET_IS_LOGIN, payload: data } as const);

export const setErrorsAC = (data: any) =>
	({ type: ACTIONS_TYPE.SET_ERRORS, payload: data } as const);

export const setPositionAC = (data: Position[]) =>
	({ type: ACTIONS_TYPE.SET_POSITION, payload: data } as const);
export const getTokenAC = (data: string) =>
	({ type: ACTIONS_TYPE.GET_TOKEN, payload: { data } } as const);

export const signUpAC = (data: User) =>
	({
		type: ACTIONS_TYPE.SIGN_UP,
		payload: data,
	} as const);

export const removeOldUsers = (data: User[]) =>
	({
		type: ACTIONS_TYPE.REMOVE_OLD_USERS,
		payload: data,
	} as const);

export const setAllUsersAC = (data: User) =>
	({ type: ACTIONS_TYPE.SET_ALL_USERS, payload: data } as const);

export const setNextPages = (data: InitialStateType) =>
	({ type: ACTIONS_TYPE.SET_NEXT_PAGES, payload: data } as const);

export const getToken = (): TypedThunk => async dispatch => {
	try {
		const tokenResponse = await authAPI.getToken();
		const {
			data: { token },
		} = tokenResponse;
		dispatch(getTokenAC(token));
	} catch (e) {
		console.error(e);
	}
};

export const signUp =
	(signData: FormData): TypedThunk =>
	async (dispatch, getState) => {
		dispatch(setStatusAC('loading'));
		try {
			const tokenResponse = await authAPI.getToken();
			const {
				data: { token },
			} = tokenResponse;
			dispatch(getTokenAC(token));
			const usersResponse = await authAPI.signUp(signData, token);
			const { status, statusText } = usersResponse;
			status === 200 ? dispatch(getAllUsers()) : console.log(statusText);
			if (status === 201) {
				dispatch(isSuccessfulAC(true));
				redirect('/successful');
				console.log(status , "status")
			} else {
				console.log(statusText);
			}
			dispatch(setStatusAC('succeeded'));
		} catch (error) {
			console.error(error, 'error');
			if (error instanceof Error) {
				dispatch(setErrorsAC((error as any).response?.data));
			}
		}
	};

export const getAllUsers = (): TypedThunk => async dispatch => {
	dispatch(setStatusAC('loading'));
	try {
		const users = await authAPI.getAll();
		const { status, data, statusText } = users;
		status === 200 ? dispatch(setAllUsersAC(data)) : console.log(statusText);
		dispatch(setStatusAC('succeeded'));
	} catch (e) {
		console.error(e);
	}
};

export const getPosition = (): TypedThunk => async dispatch => {
	dispatch(setStatusAC('loading'));
	try {
		const users = await authAPI.getPosition();
		const { status, data, statusText } = users;
		status === 200
			? dispatch(setPositionAC(data.positions))
			: console.log(statusText);
		dispatch(setStatusAC('succeeded'));
	} catch (e) {
		console.error(e);
	}
};

export const getNextPage = (): TypedThunk => async (dispatch, getState) => {
	const state = getState();
	const { next_url } = state.users.links;
	if (!next_url) return;
	try {
		const response = await axios.get(next_url);
		const { status, data, statusText } = response;
		if (status === 200) {
			const { count, links, page, total_pages, total_users, users } = data;
			dispatch(
				setNextPages({
					count,
					links,
					page,
					total_pages,
					total_users,
					users: [...state.users.users, ...users],
				})
			);
		} else {
			console.log(statusText);
		}
	} catch (e) {
		console.error(e);
	}
};

export type isSuccessfulType = ReturnType<typeof isSuccessfulAC>;
export type setErrorsType = ReturnType<typeof setErrorsAC>;
export type setPositionType = ReturnType<typeof setPositionAC>;
export type getTokenType = ReturnType<typeof getTokenAC>;
export type signUpType = ReturnType<typeof signUpAC>;
export type removeOldUsersType = ReturnType<typeof removeOldUsers>;
export type setAllUsersType = ReturnType<typeof setAllUsersAC>;
export type setNextPageType = ReturnType<typeof setNextPages>;

export type ActionsType =
	| setAllUsersType
	| setNextPageType
	| removeOldUsersType
	| signUpType
	| getTokenType
	| setPositionType
	| setErrorsType
	| isSuccessfulType;

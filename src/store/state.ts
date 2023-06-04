import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	createStore,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UsersReducers } from './reducers/UsersReducers';
import { StatusReducers } from './reducers/LoaderReducer';


const reducer = combineReducers({
	users: UsersReducers,
	status: StatusReducers,
});

export type ReduxState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	ReduxState,
	unknown,
	AnyAction
>;
export const useAppDispatch = () => useDispatch<TypedDispatch>();

export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;
export const store = createStore(reducer, applyMiddleware(thunk));

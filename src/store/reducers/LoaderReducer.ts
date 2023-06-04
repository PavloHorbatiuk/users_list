export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
const initialState = {
	status: '' as RequestStatusType,
};
type InitialStateType = typeof initialState;
export const StatusReducers = (
	state: InitialStateType = initialState,
	action: ActionsStatusType
): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return { ...state, status: action.payload };
		default:
			return state;
	}
};
export const setStatusAC = (status: RequestStatusType) =>
	({ type: 'APP/SET-STATUS', payload: status } as const);

export type setStatusACType = ReturnType<typeof setStatusAC>;

export type ActionsStatusType = setStatusACType;

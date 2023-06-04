import axios from 'axios';


export const url = (param: string) => {
	return `https://frontend-test-assignment-api.abz.agency/api/v1${param}`;
};
const instance = axios.create({
	baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
});

export const authAPI = {
	getAll() {
		return instance.get('/users');
	},
	getOne(id: number) {
		return instance.get(`${id}`);
	},
	signUp(data: FormData, token: string) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Token': token,
			},
		};
		return instance.post('/users', data, config);
	},
	getToken() {
		return instance.get('/token');
	},
	getPosition() {
		return instance.get('/positions');
	},
};

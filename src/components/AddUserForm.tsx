import React, {  useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FieldProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { InitialStateType, signUp } from '../store/reducers/UsersReducers';
import { ReduxState } from '../store/state';
import * as Yup from 'yup';
import { InitialStateType as loaderType } from './../store/reducers/LoaderReducer';
import { useNavigate } from 'react-router-dom';


export interface FormValues {
	name: string;
	phone: string;
	email: string;
	position_id: string | number;
	photo?: File;
}

const initialValues: FormValues = {
	name: '',
	email: '',
	phone: '',
	position_id: '',
};

const AddUserForm: React.FC = () => {
	const { positionToStart, serverErrors,  isAuth } = useSelector<ReduxState, InitialStateType>(
		(state) => state.users
	);
	const { status } = useSelector<ReduxState, loaderType>(
		(state) => state.status
	);
	const navigate = useNavigate();


	const clickHandler = () => navigate('/add-user')
	const dispatch = useDispatch();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const SignupSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
		phone: Yup.string()
			.min(12, 'Too Short!')
			.max(13, 'Too Long!')
			.required('Required'),
		photo: Yup.mixed().test('fileType', 'Invalid file format', function (value) {
			if (value && value instanceof File) {
				const supportedFormats = ['image/jpeg', 'image/jpg'];
				return value && supportedFormats.includes(value.type);
			}
			return true;
		}),
	});

	const handleSubmit = async (values: FormValues) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('email', values.email);
		formData.append('phone', values.phone);
		formData.append('position_id', values.position_id.toString());
		if (selectedFile) {
			formData.append('photo', selectedFile);
		}
		dispatch<any>(signUp(formData));
		if(isAuth){
			navigate('/users')
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files && event.currentTarget.files.length > 0) {
			setSelectedFile(event.currentTarget.files[0]);
		}
	};
	
	return (
		<div className="container px-4 mx-auto lg:px-14 pb-10 w-full max-w-lg  grid place-items-center">
			<h1 className="mt-36">Working with POST request</h1>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
				{({ setFieldValue, values, touched, errors }) => {

					return(
						<Form>
							<div className="mb-4 pt-12">
								<Field
									name="name"
									placeholder="Your name"
									className={`custom-input ${(errors || serverErrors) && (errors || serverErrors).name ? 'error' : ''}`}
								/>
								{((errors?.name && touched.name) || serverErrors) && (
									<div className="error-text pl-2"> {serverErrors?.fails ? serverErrors.fails.name : errors.name}</div>
								)}
							</div>
							<div className="mb-4">
								<Field
									name="email"
									placeholder="Email"
									className={`custom-input ${(errors || serverErrors) && (errors || serverErrors).email ? 'error' : ''}`}
								/>
								{((errors?.email && touched.email) || serverErrors) && (
									<div className="error-text pl-2"> {serverErrors?.fails ? serverErrors.fails.email : errors.email}</div>
								)}
							</div>

							<div className="mb-4">
								<Field
									name="phone"
									type="tel"
									placeholder="Phone"
									className={`custom-input ${(errors || serverErrors) && (errors || serverErrors).phone ? 'error' : ''}`}
									pattern="^[\+]{0,1}380([0-9]{9})$"
								/>
								<small className="pl-1">+38 (XXX) XXX - XX - XX</small>
								{((errors?.phone && touched.phone) || serverErrors) && (
									<div className="error-text pl-2"> {serverErrors?.fails ? serverErrors.fails.phone : errors.phone}</div>
								)}
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">
									Select your position
								</label>

								<div className="grid">
									{positionToStart?.length &&
										positionToStart.map((position) => (
											<div className="flex items-center" key={position.id}>
												<Field
													type="radio"
													name="position_id"
													value={position.id}
													checked={values.position_id === position.id}
													className="mr-2"
													onChange={() => setFieldValue('position_id', position.id)}
												/>
												<label className="block text-gray-700 font-normal">
													{position.name}
												</label>
											</div>

										))
									}
									{((errors?.position_id && touched.position_id) || serverErrors) && (
										<div className="error-text pl-2"> {serverErrors?.fails ? serverErrors.fails.position_id : errors.position_id}</div>
									)}
								</div>
								<div className="mb-4 pt-12">
									<Field name="photo" type="file">
										{({ field, form, meta }: FieldProps) => (
											<div className="custom-file-upload">
												<label htmlFor="file-upload" className="custom-file-upload-label">
													Upload
												</label>
												<input
													{...field}
													name="photo"
													id="file-upload"
													type="file"
													className={`custom-file-upload-input ${(errors || serverErrors) && (errors || serverErrors).photo ? 'error' : ''}`}
													onChange={handleFileChange}
												/>
												<span className="pl-4">{selectedFile ? selectedFile.name.substring(0, 20) : 'Choose a file to upload'}</span>
											</div>
										)}
									</Field>
									{((errors?.photo && touched.photo) || serverErrors) && (
										<div className="error-text pl-2"> {serverErrors?.fails ? serverErrors.fails.photo : errors.photo}</div>
									)}
								</div>
							</div>
							<div className="pt-14 justify-center flex flex-col items-center">
								{serverErrors && (
									<div className='mb-5'>
										<div className="error-text">{serverErrors?.message}</div>
									</div>
								)}
								{status === 'loading' && <div className='mb-5'>Loading</div>}
								<button type="submit" className="btn bg-primary hover:bg-hover">
									Sign up
								</button>
							</div>
						</Form>
					)
					
}}
			</Formik>
		</div>
	);
};

export { AddUserForm };

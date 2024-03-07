import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import * as Yup from "yup";

import '../form/form.scss'

const CustomForm = (props) => {
	
	const [findChar, setFindChar] = useState({});
	const [serverError, setServerError] = useState(null);

	const { findCharacter } = useMarvelService();	

	const handleSubmit = (values) => {			
		
		findCharacter(values.name.split(' ').join('%20'))
			.then(res => {
				setFindChar(res);
				props.onCharFinded(res);
				setServerError(false)})
			.catch(error => setServerError(true))
	}
	
	const ShowButton = ({serverError, findChar}) => {

		if (serverError) {
			return (
				<div className="error">The character was not found. Check the name and try again</div>
			)
		} else {

		return (
			<div className="find-char">
			<div className="find-char__done">There is! Visit {findChar.name} page?</div>
			<Link to={`/${findChar.id}`} className="button button__secondary">
          <span className="inner">to page</span>
        </Link>
				</div>
		)
	}}

	const showButton = serverError !== null ? <ShowButton serverError={serverError} findChar={findChar}/> : null;

  return (
		<div className="char__form">
		<Formik
			initialValues={{
				name: ''
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(2, 'Must be at least 2 characters')					
					.required('This field is required')
			})}
			onSubmit={values => handleSubmit(values)}>
    <Form className="form">
      <label 
				className='form__label'
				htmlFor="name">Or find a character by name:</label>
      <div className="form__input">
        <Field 
					type="text" 
					placeholder="Enter name" 
					name="name"
					id="name"/>
					
        <button type="submit" className="button button__main">
          <span className="inner">find</span>
        </button>
				<ErrorMessage className="error" name='name' component='div' />
				{showButton}
      </div>
    </Form>
		</Formik>
		</div>
  );
};



export default CustomForm;

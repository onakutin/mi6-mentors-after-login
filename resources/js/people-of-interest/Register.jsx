import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';

export default function Register(props) {

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState({});

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {

        event.preventDefault();

        // clear the errors
        setErrors({});

        // make the AJAX request
        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        // parse the response as JSON
        const response_data = await response.json();

        // if the response code is not 2xx (success)
        if (Math.floor(response.status / 100) !== 2) {
            switch (response.status) {
                case 422:
                    // handle validation errors here
                    console.log('VALIDATION FAILED:', response_data.errors);
                    setErrors(response_data.errors);
                    break;
                default:
                    console.log('UNKNOWN ERROR', response_data);
                    break;
            }
        } else {
            // successful registration
            setUser(null); // change the user status to "unknown"
                           // that triggers re-fetching the user's status
                           // in App.jsx
        }

        // // with axios
        // try {
        //     // make the AJAX request
        //     const response = await axios.post('/register', values);
        //     // get the (already JSON-parsed) response data
        //     const response_data = response.data;
        // } catch (error) {
        //     // if the response code is not 2xx (success)
        //     switch (error.response.status) {
        //         case 422:
        //             // handle validation errors here
        //             console.log('VALIDATION FAILED:', error.response.data.errors);
        //             break;
        //         case 500:
        //             console.log('UNKNOWN ERROR', error.response.data);
        //             break;
        //     }
        // }
    }

    const handleChange = (event) => {
        setValues(previous_values => {
            return ({...previous_values,
                [event.target.name]: event.target.value
            });
        });
    }

    return (
        <form action="/register" method="post" onSubmit={ handleSubmit }>

            Name:<br />
            <input type="text" name="name" value={ values.name } onChange={ handleChange } />
            <br />
            {
                errors.name
                    ? <div className="errors">{ errors.name.map((error, i) => <div key={ i } className="error">{ error }</div> ) }</div>
                    : ''
            }

            Email:<br />
            <input type="email" name="email" value={ values.email } onChange={ handleChange } />
            <br />
            {
                errors.email
                    ? <div className="errors">{ errors.email.map((error, i) => <div key={ i } className="error">{ error }</div> ) }</div>
                    : ''
            }


            Password:<br />
            <input type="password" name="password" value={ values.password } onChange={ handleChange } />
            <br />
            {
                errors.password
                    ? <div className="errors">{ errors.password.map((error, i) => <div key={ i } className="error">{ error }</div> ) }</div>
                    : ''
            }

            Confirm pasword:<br />
            <input type="password" name="password_confirmation" value={ values.password_confirmation } onChange={ handleChange } />
            <br />
            {
                errors.password_confirmation
                    ? <div className="errors">{ errors.password_confirmation.map((error, i) => <div key={ i } className="error">{ error }</div> ) }</div>
                    : ''
            }

            <button>Register</button>

        </form>
    );
}
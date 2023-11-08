import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';

export default function Login(props) {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {

        event.preventDefault();

        // make the AJAX request
        const response = await fetch('/login', {
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
            // successful login
            setUser(null); // tell App.jsx to re-fetch the user information
        }

        // // with axios
        // try {
        //     // make the AJAX request
        //     const response = await axios.post('/login', values);
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
        <form action="/login" method="post" onSubmit={ handleSubmit }>

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

            <button>Login</button>

        </form>
    );
}
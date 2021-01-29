import React, {useState} from 'react'
import axios from 'axios'


const initialValues = {
    username: 'Lambda School', //i am doing this because its harcoded in backend server
    password:'i<3Lambd4',
}

function LoginForm (props)  {
 
    const [formValues, setFormValues] = useState(initialValues)


const handleChange = (e) => {
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/login', formValues)
        .then((res) =>{
            localStorage.setItem('token', res.data.payload);
            props.history.push('/bubble-page');
            console.log('this is res data in login',res.data)
        })
        .catch((err) => {
            console.log('failure in login post!!', err)
        })
}


return (
<div className='login-container'>
         <h1>Login in For Bubbles!</h1>

 <form onSubmit={handleSubmit}>
<label>username</label>
<input name='username' type='text' onChange={handleChange} value={formValues.username}>
</input>
<label>password</label>
<input name ='password' type='password' onChange={handleChange} value={formValues.password}>
</input>

<button>Login</button>

</form>
</div>
)
}

export default LoginForm;
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
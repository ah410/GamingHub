import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client.js';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from 'react-password-strength-bar';

const Signup = () => {
    // Create State variables for username and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    // Create function to handle sign up submission
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name == 'email') {
            setEmail(value);
        } else if (name == 'password') {
            setPassword(value);
        }
    }

    // Create a function for form submission, use supabase sign up new user
    const handleSubmit = (e) => {
        e.preventDefault();
        signUpNewUser();
    }

    const signUpNewUser = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: 'example@email.com', 
            password: 'example-password'
        })
        
        if (error) {
            console.log("Error logging in: ", error);
        } else {
            console.log("Success logging in: ", data);
            navigate('/');
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-game">
            <div className='bg-gray-900 w-11/12 sm:5/6 md:w-3/5 xl:w-1/3 rounded-md p-6 shadow-md shadow-black'>
                <span className='text-3xl'>Register</span>
                <form className='flex flex-col mt-8'>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="email" className='text-left mb-1'>Email</label>
                        <input type="email" pattern=".+@example\.com" id='email' name='email' placeholder='Enter your email' className='rounded-md bg-gray-800 text-white' value={email} onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="password" className='text-left mb-1'>Password</label>
                        <input type="password" id='password' name='password' placeholder='••••••••' className='rounded-md bg-gray-800' value={password} onChange={handleChange}/>
                        <PasswordStrengthBar password={password} className='mt-2'/>
                    </div>

                    <button className='bg-primary rounded-lg my-5 py-3 hover:bg-primary-dark' onClick={handleSubmit}>Create account</button>
                    <Link to='/login' className='hover:underline text-primary-light'>Already have an account? Login here</Link>
                </form>
            </div>
        </div>

    )
}

export default Signup;
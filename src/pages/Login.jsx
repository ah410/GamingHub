import { useState } from 'react';
import { supabase } from '../../client.js';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    // Create State variables for username and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Create function to handle sign up submission
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name == 'email') {
            setEmail(value);
        } else if (name == 'password') {
            setPassword(value);
        }
    }

    // Create a function for form submission, use supabase sign in with password
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithPassword();
    }

    const signInWithPassword = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        // Toast notifications on error for login, else redirect to home page
        if (error) {
            toast.error(`${error.message}`, {theme: 'colored'});
        } else {
            window.location = '/';
        }
    }


    return (
        <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-game">
            <div className='bg-gray-900 w-11/12 sm:5/6 md:w-3/5 xl:w-1/3 rounded-md p-6 shadow-md shadow-black'>
                <span className='text-3xl'>Login in to your account</span>
                <form className='flex flex-col mt-8'>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="email" className='text-left mb-1'>Email</label>
                        <input type="email" pattern=".+@example\.com" id='email' name='email' placeholder='Enter your email' className='rounded-lg bg-gray-800' value={email} onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="password" className='text-left mb-1'>Password</label>
                        <input type="password" id='password' name='password' placeholder='••••••••' className='rounded-lg bg-gray-800' value={password} onChange={handleChange}/>
                    </div>

                    <button type='submit' className='bg-primary rounded-lg my-5 py-3 hover:bg-primary-dark' onClick={handleSubmit}>Log in to your account</button>
                    <ToastContainer></ToastContainer>
                    <Link to='/signup' className='hover:underline text-primary-light'>Don't have an account? Register Here</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;
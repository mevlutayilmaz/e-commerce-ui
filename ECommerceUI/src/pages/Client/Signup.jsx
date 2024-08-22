import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../api/users';
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils'

const Signup = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const response = await signup(data.nameSurname, data.username, data.email, data.password, data.password);
        response.succeeded ? showSuccessToast('Kayıt başarılı.') : showErrorToast(`Kayıt başarısız: ${response.message}`)
    };

    return (
        <div className="flex items-center justify-center mt-4 min-h-[calc(100vh-13rem)]">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up to platform</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" {...register('nameSurname', { required: 'UserNameOrEmail is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input type="text" {...register('username', { required: 'UserNameOrEmail is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" {...register('email', { required: 'UserNameOrEmail is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" {...register('password', { required: 'Password is required' })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password confirm</label>
                        <input type="password" {...register('passwordConfirm', { required: 'Password confirm is required' })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already create an account? <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                    </div>
                </form>
            </div> 
        </div>
        
    );
  };
  
  export default Signup;
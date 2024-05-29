import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { Dialogs } from '../ui/dialogs';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export type LoginRequest = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      await login(data);
      Dialogs.success("Logged in successfully");
      navigate("/tickets");
    } catch (error) {
      if (error instanceof Error) {
        Dialogs.error(`Failed to log in: ${error.message}`);
      } else {
        Dialogs.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Sign in to your account</h2>
      <form className="max-w-md mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          errors={errors}
          register={register}
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
        />
        <div className="relative">
          <InputField
            errors={errors}
            register={register}
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;

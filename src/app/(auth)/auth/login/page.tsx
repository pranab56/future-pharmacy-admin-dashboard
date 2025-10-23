"use client";

import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors = { email: '', password: '' };

    // Validation
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert('Login successful!');
        router.push('/');
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={"/images/auth/image.png"}
          alt="Login illustration"
          fill
          className="object-cover rounded-r-3xl"
          priority
        />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 ">
        <div className="w-full max-w-md p-8 rounded-lg bg-gray-100">
          {/* Logo and Title */}
          <div className="text-center ">
            <div className="flex flex-col items-center justify-center gap-1">

              <Image
                src={"/icons/logo2.png"}
                alt="Login illustration"
                height={1000}
                width={1000}
                className="o w-52 h-auto rounded-r-3xl py-2"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
                <p className="text-gray-600 mb-8">Optimus Health Solutions</p>
              </div>

            </div>

          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="Enter your email address here..."
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E4585] focus:border-transparent transition-all`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="Enter your password here..."
                  className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E4585] focus:border-transparent transition-all pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#8E4585] hover:text-[#8E4585] font-medium"

              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8E4585] hover:bg-[#8E4585] text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>


          </form>
        </div>
      </div>
    </div>
  );
}
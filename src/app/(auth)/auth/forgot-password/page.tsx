"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // If validation passes, proceed with OTP sending
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      alert(`OTP has been sent to ${email}`);
      router.push('/auth/verify-email');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={"/images/auth/image.png"}
          alt="Forgot Password illustration"
          fill
          className="object-cover rounded-r-3xl"
          priority
        />
      </div>

      {/* Right Panel - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md p-8 rounded-lg bg-white">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={"/icons/logo2.png"}
                alt="Optimus Logo"
                height={1000}
                width={1000}
                className="w-52 h-auto py-2"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Forget Password</h2>
                <p className="text-gray-600 text-sm">
                  Enter your registered email to receive an OTP.
                </p>
              </div>
            </div>
          </div>

          {/* Forgot Password Form */}
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
                  if (error) setError('');
                }}
                placeholder="Enter your email address here..."
                className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E4585] focus:border-transparent transition-all`}
              />
              {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full bg-[#8E4585] hover:bg-[#7a3a71] cursor-pointer text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : isSuccess ? 'OTP Sent!' : 'Send OTP'}
            </button>

            {/* Back to Login Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{' '}
              <Link
                href="/auth/login"
                className="text-[#8E4585] hover:text-[#7a3a71] font-medium"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ClipboardEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Fixed ref callback - no return value
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');

    // Validation
    if (otpValue.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    // Proceed with verification
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Verification code ${otpValue} has been verified successfully!`);
      router.push('/auth/reset-password');
    }, 1500);
  };

  // Handle resend
  const handleResend = (): void => {
    setOtp(['', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    alert('A new verification code has been sent to your phone');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={"/images/auth/image.png"}
          alt="Verification illustration"
          fill
          className="object-cover rounded-r-3xl"
          priority
        />
      </div>

      {/* Right Panel - Verification Form */}
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
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Account Recovery</h2>
                <p className="text-gray-600 text-sm mb-4">
                  To help keep your account safe, House Finder wants to make sure it's really you trying to sign in.
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Get a Verification Code</h3>
                <p className="text-gray-600 text-xs">
                  To get a verification code, first confirm the phone number you added to your account{' '}
                  <span className="font-semibold">*********@coredevs.ltd</span>. Standard rates apply.
                </p>
              </div>
            </div>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div>
              <div className="flex justify-center gap-4 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={setInputRef(index)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-16 h-16 text-center text-2xl font-semibold border-2 ${error ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E4585] focus:border-transparent transition-all`}
                  />
                ))}
              </div>
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Verified Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8E4585] hover:bg-[#7a3a71] text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verified'}
            </button>

            {/* Resend Link */}
            <div className="text-center text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-[#8E4585] hover:text-[#7a3a71] font-medium underline"
              >
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
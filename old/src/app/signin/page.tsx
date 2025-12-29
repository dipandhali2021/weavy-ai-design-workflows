'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    // Add Google sign-in logic here
    console.log('Google sign-in clicked');
    router.push('/dashboard');
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, transparent 50%, #ffffff 100%),
          linear-gradient(to bottom, rgba(219, 226, 231, 0.5) 0%, rgba(219, 226, 231, 0.7) 30%, rgba(255, 255, 255, 0.9) 100%),
          url(https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681ccdbeb607e939f7db68fa_BG%20NET%20Hero.avif),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, cover, cover, 10px 10px, 10px 10px',
        backgroundPosition:
          'center bottom, center center, center top, 0 0, 0 0',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat, repeat',
      }}
    >
      {/* Logo - Top Left Corner */}
      <div className="absolute top-0 left-0 z-10">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682350d42a7c97b440a58480_Nav_20left_20item_20-_20D-1.svg"
          alt="Logo"
          className="h-10 w-auto invert"
        />
      </div>

      {/* Sign-in Card */}
      <div className="bg-white rounded-lg border-white border  overflow-hidden w-[350px]">
        <div className="w-full h-[280px] bg-linear-to-b from-[#5d8190] to-[#7a9999] flex items-center justify-center overflow-hidden">
          <img
            src="https://app.weavy.ai/assets/weavy-sign-in-back.png"
            alt="3D Object"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-12 py-10 flex flex-col items-center">
          <h3 className="text-[32px]  text-gray-900 mb-2 text-center leading-tight">
            Welcome to Weavy
          </h3>
          <p className="text-[15px] text-gray-500 mb-8 text-center">
            Start building your design machine
          </p>

          {/* Sign-in Buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-white border border-gray-300 rounded-md flex items-center justify-center gap-3 hover:bg-[#d8d8d9] transition-colors duration-200 "
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-[15px] font-medium text-gray-700">
                Log in with Google
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 right-8 text-[12px] text-gray-500">
        © 2025 Weavy. All rights reserved.
      </div>
    </div>
  );
};

export default SignInPage;

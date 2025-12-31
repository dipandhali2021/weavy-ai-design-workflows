'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { getStoredToken } from '@/lib/auth';
import Link from 'next/link';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            config: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              type?: 'standard' | 'icon';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '737286057515-0m14h8fsn0g8fglab18sbgqt7uqueasc.apps.googleusercontent.com';

export default function SignInPage() {
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token using the correct auth utility
        const token = getStoredToken();
        
        if (token) {
          // Verify the token is valid by calling the session endpoint
          const response = await fetch('http://localhost:4000/auth/session', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          });

          if (response.ok) {
            // User is authenticated, redirect to dashboard
            router.push('/dashboard');
            return;
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [router]);

  // Redirect to backend OAuth flow
  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center"
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
      <Link href={"/"} className="absolute left-0 top-0 z-10">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682350d42a7c97b440a58480_Nav_20left_20item_20-_20D-1.svg"
          alt="Logo"
          className="h-10 w-auto invert"
          
        />
      </Link>

      <div className="w-[350px] overflow-hidden rounded-lg border border-white bg-white">
        <div className="flex h-[280px] w-full items-center justify-center overflow-hidden bg-linear-to-b from-[#5d8190] to-[#7a9999]">
          <img
            src="https://app.weavy.ai/assets/weavy-sign-in-back.png"
            alt="3D Object"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center px-12 py-10">
          <h3 className="mb-2 text-center text-[32px] leading-tight text-gray-900">
            Welcome to Weavy
          </h3>
          <p className="mb-8 text-center text-[15px] text-gray-500">
            Start building your design machine
          </p>

          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-[15px] font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 text-[12px] text-gray-500">
        © 2025 Weavy. All rights reserved.
      </div>
    </div>
  );
}

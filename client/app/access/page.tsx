// app/login/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, TruckElectric } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:px-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <TruckElectric className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold">
                Manufactflow
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
              Enter your email and password to access your account.
            </p>

            <form className="space-y-4 sm:space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="sellostore@company.com"
                  className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm sm:text-base transition-shadow"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm sm:text-base transition-shadow"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-600 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember Me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-600 hover:underline"
                >
                  Forgot Your Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 sm:py-3.5 rounded-lg font-medium hover:bg-emerald-700 active:bg-emerald-800 transition-colors text-sm sm:text-base shadow-sm hover:shadow-md"
              >
                Log In
              </button>
            </form>
            <div className="mt-6 sm:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">
                    Or Login With
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span className="text-sm font-medium">Apple</span>
                </button>
              </div>
            </div>

            <p className="mt-6 sm:mt-8 text-center text-sm text-gray-600">
              Don&apos;t Have An Account?{" "}
              <Link
                href="/register"
                className="text-emerald-600 font-semibold hover:underline"
              >
                Register Now.
              </Link>
            </p>

            {/* Footer */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
              <span>Copyright © 2025 Nornetics.</span>
              <Link
                href="/privacy"
                className="hover:text-gray-700 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Dashboard Preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 xl:p-16 flex-col justify-center items-center text-white overflow-hidden relative">
        <div className="max-w-2xl w-full z-10">
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-4 leading-tight">
            Effortlessly manage your team and operations.
          </h2>
          <p className="text-emerald-100 mb-8 xl:mb-12 text-base xl:text-lg">
            Log in to access your CRM dashboard and manage your team.
          </p>
          <div className="relative w-full">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                className="w-full h-auto"
                src="/assets/image/landscape.PNG"
                width={1200}
                height={800}
                alt="Dashboard Overview"
                priority
                quality={90}
              />
            </div>

            <div className="absolute -bottom-6 xl:-bottom-8 -right-6 xl:-right-8 w-3/5 rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/20 transition-transform duration-500 hover:scale-105">
              <Image
                className="w-full h-auto"
                src="/assets/image/potrait.PNG"
                width={500}
                height={300}
                alt="Revenue Chart Detail"
                quality={90}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}

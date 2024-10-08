import LoginForm from "../components/Login";
import HeroSection from "../components/HeroSection";
import { useState } from "react";
import SignupForm from "../components/signup";

export default function AuthPage() {
  const [state, setState] = useState(false)

  const switchToSignup = () => {
    setState(!state)
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section - Login Form */}
      <div className="leftpane pl-11 flex flex-col w-full justify-center items-left text-white p-8 md:p-16">
        <div className="mx-auto w-[90%]">
          {
            !state ? (
              <LoginForm switchToSignup={switchToSignup} />
            ) : 
            (
              <SignupForm switchToLogin={switchToSignup} />
            )
          }
        </div>
      </div>

      {/* Right Section - Hero Section */}
      <HeroSection />
    </div>
  );
}

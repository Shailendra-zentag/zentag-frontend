import React, { ReactNode } from 'react';
import AuthBackground from './AuthBackground';
import AuthFooter from './AuthFooter';
import TrustSection from './TrustSection';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0E0E0E] relative overflow-hidden font-montserrat">
      <AuthBackground />
      
      {/* Right side overlay - responsive */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#0C0C0C] opacity-60 hidden lg:block"></div>

      {/* Main content container - optimized for 1366px */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-8 xl:px-12 2xl:pl-[6rem] 2xl:pr-16 py-8 gap-6 lg:gap-8 xl:gap-16">
        {children}
        <TrustSection />
      </div>

      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
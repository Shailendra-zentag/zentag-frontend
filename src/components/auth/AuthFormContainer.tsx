import React, { ReactNode } from 'react';
import ZentagLogo from './ZentagLogo';

interface AuthFormContainerProps {
  children: ReactNode;
  subtitle?: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ 
  children, 
  subtitle = "Welcome to Zentag AI Creative platform" 
}) => {
  return (
    <div className="w-full max-w-[580px] lg:max-w-[580px] xl:max-w-[650px] h-auto bg-[#0C0C0C] rounded-[50px] p-6 sm:p-8 lg:p-10 xl:p-16 flex flex-col flex-shrink-0 lg:mr-8">
      <ZentagLogo />
      
      {/* Welcome text */}
      <p className="text-white text-center text-sm lg:text-base font-medium mb-6 sm:mb-8 lg:mb-10 xl:mb-12 leading-relaxed">
        {subtitle}
      </p>

      {/* Form content */}
      {children}
    </div>
  );
};

export default AuthFormContainer;
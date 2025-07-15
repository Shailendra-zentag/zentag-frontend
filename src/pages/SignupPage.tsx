import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthLayout from '../components/auth/AuthLayout';
import AuthFormContainer from '../components/auth/AuthFormContainer';
import SignupForm from '../components/auth/forms/SignupForm';
import { signupUser } from '../api/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set page title for SEO
    document.title = 'SignUp - Zentag AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create your zentag.ai account and start editing videos like a professional. Join thousands of creators worldwide.');
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (values: { 
    name: string; 
    email: string; 
    password: string; 
    agreeToTerms: boolean 
  }, { setSubmitting }: any) => {
    setIsLoading(true);
    try {
      const res = await signupUser(values);
      if (res.status) {
        toast.success("Signup successfully!");
        navigate('/login');
      } else {
        toast.error(res.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormContainer subtitle="Create your Zentag AI account">
        <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default SignupPage;
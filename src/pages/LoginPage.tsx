import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthLayout from '../components/auth/AuthLayout';
import AuthFormContainer from '../components/auth/AuthFormContainer';
import LoginForm from '../components/auth/forms/LoginForm';
import { loginUser, checkAuth } from '../api/auth.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set page title for SEO
    document.title = 'Login - Zentag AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sign in to zentag.ai to access your video editing projects and create amazing content.');
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    setIsLoading(true);
    try {
      const res = await loginUser(values);
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        
        // Check user from /me API
        const userRes = await checkAuth();
        if (userRes && userRes?.user?.userId) {
          localStorage.setItem("userId", res.userId);
        }
        navigate('/dashboard');
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout><></>
      <AuthFormContainer subtitle="Welcome to Zentag AI Creative platform">
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default LoginPage;
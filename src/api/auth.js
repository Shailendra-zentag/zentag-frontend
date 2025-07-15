// // Mock API functions - replace with actual API calls
// export const loginUser = async (credentials: { email: string; password: string }) => {
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   // Mock successful login
//   return {
//     status: true,
//     message: 'Login successful',
//     userId: 'user-123',
//     token: 'mock-jwt-token'
//   };
// };

// export const signupUser = async (userData: { 
//   name: string; 
//   email: string; 
//   password: string; 
//   agreeToTerms: boolean 
// }) => {
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   // Mock successful signup
//   return {
//     status: true,
//     message: 'Account created successfully',
//     userId: 'user-123',
//     token: 'mock-jwt-token'
//   };
// };

// export const checkAuth = async () => {
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   // Mock user data
//   return {
//     user: {
//       userId: 'user-123',
//       email: 'user@example.com',
//       name: 'John Doe'
//     }
//   };
// };

const apiUrl = import.meta.env.VITE_API_HOSTNAME;
const videoapiUrl = import.meta.env.VITE_VIDEO_API_URL;

export const signupUser = async (data) => {
  const response = await fetch(`${apiUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const loginUser = async (data) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const logoutUser = async (data) => {
  const response = await fetch(`${apiUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  return await response.json();
};

export const checkAuth = async () => {
    const res = await fetch(`${apiUrl}/me`, {
      method: "GET",
      credentials: "include",
    });
    return res.json();
};

export const uploadApi = async (data) => {
    const res = await fetch(`${videoapiUrl}/api/videos/upload`, {
      method: "POST",
      credentials: "include",
      body: data,
    });
    return res.json();
};

export const fetchVideos = async (userId) => {
    const res = await fetch(`${videoapiUrl}/api/videos?userId=${userId}`,{
      method: "GET",
      credentials: "include",
    });
     return res;
};

export const fetchVideoByShortId = async (shortId) => {
  const res = await fetch(`${videoapiUrl}/api/videos/${shortId}`);
  if (!res.ok) {
    throw new Error('Video not found');
  }
  return res.json();
};

export const trimApi = async (data) => {
    const res = await fetch(`${videoapiUrl}/api/videos/trim`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return res.json();
};

export const ssoLogin = async (provider, email) => {
  // Simulate SSO login
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    status: true,
    message: `Successfully signed in with ${provider}`,
    userId: 'user-123',
    token: 'mock-jwt-token'
  };
};


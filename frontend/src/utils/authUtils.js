// Utility functions for authentication
export const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const getUserData = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const isAdmin = () => {
  const user = getUserData();
  return user && user.role === 'admin';
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
};
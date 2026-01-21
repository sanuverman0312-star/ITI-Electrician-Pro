// Admin credentials from environment variables
export const ADMIN_CONFIG = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'Saanu03',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Shashank0312@',
  sessionTimeout: 3600000,
};

// Check if user is admin
export const isAdminLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  
  const adminSession = localStorage.getItem('adminSession');
  if (!adminSession) return false;
  
  try {
    const session = JSON.parse(adminSession);
    const now = Date.now();
    
    if (now - session.loginTime > ADMIN_CONFIG.sessionTimeout) {
      localStorage.removeItem('adminSession');
      return false;
    }
    
    return session.isAuthenticated;
  } catch (error) {
    return false;
  }
};

// Login admin
export const loginAdmin = (username, password) => {
  if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
    const session = {
      isAuthenticated: true,
      loginTime: Date.now(),
      username: username
    };
    localStorage.setItem('adminSession', JSON.stringify(session));
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
};

// Logout admin
export const logoutAdmin = () => {
  localStorage.removeItem('adminSession');
};
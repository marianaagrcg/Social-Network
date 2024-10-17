
export const signUp = async (username, email, password) => {
    try {
      const response = await fetch('https://social-network-v7j7.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || data.message || 'Signup failed');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  